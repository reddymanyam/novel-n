import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import RingLoader from "react-spinners/RingLoader";
import PropagateLoader from "react-spinners/PropagateLoader";
import HashLoader from "react-spinners/HashLoader";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Stack } from "@mui/material";

/**
 * CSS override for spinner styling.
 * @type {CSSProperties}
 * @property {string} display - CSS property to make the spinner block-level.
 * @property {string} margin - CSS property to center the spinner horizontally.
 * @property {string} borderColor - CSS property to set the border color of the spinner.
 */
const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

/**
 * Spinner component to display a loading spinner.
 * @returns {JSX.Element} The spinner component.
 */
export default function Spinner() {
    return (
        <Stack width='100%' height='100%' justifyContent='center' alignItems='center'>
            <div className="sweet-loading">
                {/* RingLoader component from react-spinners to show a loading spinner */}
                <RingLoader
                    color={'#36ACB5'} // Spinner color
                    cssOverride={override} // Custom CSS styling for the spinner
                    size={100} // Size of the spinner in pixels
                    aria-label="Loading Spinner" // ARIA label for accessibility
                    data-testid="loader" // Test ID for testing purposes
                />
            </div>
        </Stack>
    );
}
