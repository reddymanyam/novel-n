import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { IconButton, Link as MuiLink, Stack, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from '@mui/material';
import { useFrappeGetDocList, useFrappeDeleteDoc, useFrappeCreateDoc, useFrappePostCall } from 'frappe-react-sdk';

//Toastify 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import { useTheme } from '@emotion/react';

/**
 * Hidden input component for file uploads.
 */
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

/**
 * Style object for the modal.
 */
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

/**
 * Component for displaying and managing attachments in a modal.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {Function} props.handleClose - Function to close the modal.
 * @param {string} props.taskNameForAttachment - Name of the task to fetch attachments for.
 *
 * @returns {JSX.Element} The rendered modal component.
 */
export default function AttachmentModal({ open, handleClose, taskNameForAttachment }) {

    /** Hook to fetch Attachments */
    const { data: attachmentsData, mutate } = useFrappeGetDocList('File', {
        fields: ['name', 'file_url'],
        filters: [['attached_to_doctype', '=', 'Task'], ['attached_to_name', '=', taskNameForAttachment]]
    });

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [attachmentToDelete, setAttachmentToDelete] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [filesToUpload, setFilesToUpload] = useState([]);

    const theme = useTheme();
    const notifySuccess = (msg) => toast.success(msg, { toastId: "success" });
    const notifyError = (msg) => toast.error(msg, { toastId: "error" });

    /** Hook to delete Attachments */
    const { deleteDoc } = useFrappeDeleteDoc();

    /**
     * Handles the click event for deleting an attachment.
     * @param {Object} attachment - The attachment to be deleted.
     */
    const handleDeleteClick = (attachment) => {
        setAttachmentToDelete(attachment);
        setShowConfirmDialog(true);
    };

    /**
     * Handles file selection from input.
     * @param {Event} event - The change event from the file input.
     */
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setFilesToUpload(files);
        setSelectedFiles(files.map(file => file.name));
    };

    /** Saves the attachments added by user */
    const handleSaveAttachment = () => {
        filesToUpload.map(async (file) => {
            try {
                const fileUploadUrl = 'http://10.80.4.81/api/method/upload_file';
                const formData = new FormData();
                formData.append('file', file);
                formData.append('doctype', 'Task');
                formData.append('docname', taskNameForAttachment);
                formData.append('filename', file.name);
                formData.append('file_url', `/files/${file.name}`);

                console.log('File upload URL:', fileUploadUrl);
                const fileUploadResponse = await axios.post(fileUploadUrl, formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        withCredentials: true
                    });


                if (!fileUploadResponse.data.message || !fileUploadResponse.data.message.file_url) {
                    throw new Error('File upload failed or response is missing file URL');
                }

                notifySuccess("File uploaded successfully!!!");
                setFilesToUpload([]);
                setSelectedFiles([]);
                mutate();

            } catch (error) {
                notifyError("File upload failed");
                // console.error('File upload error:', error.response ? error.response.data : error.message);
                throw new Error('File upload failed: ' + (error.response ? error.response.data : error.message));
            }
        });

    };

    /**
     * Handles the deletion of a selected file from the list of new files.
     * Removes the file from both the displayed list of selected files and the list of files to be uploaded.
     * @param {string} fileName - The name of the file to be deleted.
     */
    const handleDeleteSelectedFile = (fileName) => {
        setSelectedFiles(prevFiles => prevFiles.filter(file => file !== fileName));
        setFilesToUpload(prevFiles => prevFiles.filter(file => file.name !== fileName));
    };


    /**
     * Handles the deletion of the attachment based on user confirmation.
     * @param {boolean} condition - If true, proceed with deletion; otherwise, cancel.
     */
    const handleDeleteAttachment = (condition) => {
        if (condition) {
            if (attachmentToDelete) {
                deleteDoc('File', attachmentToDelete.name)
                    .then((res) => {
                        if (res.message === 'ok') {
                            mutate(); // Refetch attachments after deletion
                            setAttachmentToDelete(null);
                            setShowConfirmDialog(false);
                        }
                    })
                    .catch((err) => {
                        console.error('Error deleting attachment:', err);
                    });
            }
        } else {
            setAttachmentToDelete(null);
            setShowConfirmDialog(false);
        }
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack gap={2}>
                        <Typography id="modal-modal-title" variant="h6">
                            Attachments
                        </Typography>
                        <Box>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload files
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={handleFileChange}
                                    multiple
                                />
                            </Button>
                        </Box>

                        <Stack justifyContent='space-between' alignItems="center">
                            {/* Display Existing Files */}
                            {attachmentsData?.length > 0 ?
                                (
                                    <>
                                        <Typography variant="h5">Uploaded Files</Typography>
                                        {attachmentsData.map((attachment) => (
                                            <Stack key={attachment.name}
                                                direction="row"
                                                alignItems="center"
                                                justifyContent='space-between'
                                                spacing={2}
                                                width='100%'
                                            >
                                                <MuiLink href={attachment.file_url} target="_blank" rel="noopener">
                                                    {attachment.file_url.split('/')[2]}
                                                </MuiLink>
                                                <IconButton onClick={() => handleDeleteClick(attachment)}>
                                                    <DeleteOutlineOutlinedIcon />
                                                </IconButton>
                                            </Stack>
                                        ))}
                                    </>
                                )
                                :
                                selectedFiles.length === 0 && <Typography variant='body'>No attachments</Typography>
                            }

                            {/* Display New Files */}
                            {selectedFiles.length > 0 && (
                                <>
                                    <Typography variant="h5">New Files</Typography>
                                    {selectedFiles.map((fileName) => (
                                        <Stack key={fileName}
                                            direction="row"
                                            alignItems="center"
                                            justifyContent='space-between'
                                            spacing={2}
                                            width='100%'
                                        >
                                            <Typography variant='body'>{fileName}</Typography>
                                            <IconButton onClick={() => handleDeleteSelectedFile(fileName)}>
                                                <DeleteOutlineOutlinedIcon />
                                            </IconButton>
                                        </Stack>
                                    ))}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSaveAttachment}
                                    >
                                        Save
                                    </Button>
                                </>
                            )}
                        </Stack>
                    </Stack>
                </Box>
            </Modal>

            {/* Confirmation Dialog */}
            <Dialog
                open={showConfirmDialog}
                onClose={() => { handleDeleteAttachment(false) }}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to delete the attachment "{attachmentToDelete?.file_url.split('/').pop()}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleDeleteAttachment(false) }}>Cancel</Button>
                    <Button onClick={() => { handleDeleteAttachment(true) }} color="error">Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Toast */}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme.palette.mode}
            />
        </>
    );
}
