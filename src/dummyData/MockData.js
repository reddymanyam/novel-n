const tasksData =
    [
        {
            "name": "TASK - 002548",
            "assigned_to_name": 'Sample',
            "status": "Overdue",
            "exp_start_date": "2024-08-21",
            "exp_end_date": "2024-08-21",
            "team": "Design",
            "stages": "Construction",
            "task_description_1": null,
            "sub_status": "Not yet started",
            "parent_task": null,
            "subject": "Project Kick-off meeting",
            "priority": "Low",
            "file_urls": [],
            "child_table": []
        },
        {
            "name": "TASK - 002549",
            "assigned_to_name": null,
            "status": "Completed",
            "exp_start_date": "2024-08-21",
            "exp_end_date": "2024-08-21",
            "team": "Design",
            "stages": "Construction",
            "task_description_1": null,
            "sub_status": "Not yet started",
            "parent_task": null,
            "subject": "Weekly Updates",
            "priority": "Low",
            "file_urls": [],
            "child_table": []
        },
        {
            "name": "TASK - 002550",
            "assigned_to_name": null,
            "status": "Cancelled",
            "exp_start_date": "2024-08-21",
            "exp_end_date": "2024-08-21",
            "team": "Design",
            "stages": "Construction",
            "task_description_1": null,
            "sub_status": "Not yet started",
            "parent_task": null,
            "subject": "Onsite feedback",
            "priority": "Low",
            "file_urls": [],
            "child_table": []
        },
        {
            "name": "TASK - 002551",
            "assigned_to_name": null,
            "status": "Overdue",
            "exp_start_date": "2024-08-21",
            "exp_end_date": "2024-08-21",
            "team": "Design",
            "stages": "Construction",
            "task_description_1": null,
            "sub_status": "Not yet started",
            "parent_task": null,
            "subject": "Monthly Budget & Timeline review",
            "priority": "Low",
            "file_urls": [],
            "child_table": []
        },
        {
            "name": "TASK - 002552",
            "assigned_to_name": null,
            "status": "Overdue",
            "exp_start_date": "2024-08-21",
            "exp_end_date": "2024-08-21",
            "team": "Design",
            "stages": "Construction",
            "task_description_1": null,
            "sub_status": "Not yet started",
            "parent_task": null,
            "subject": "Construction Milestones",
            "priority": "Low",
            "file_urls": [],
            "child_table": [
                {
                    "task_nme": "Site Prep",
                    "child_status": "Pending"
                },
                {
                    "task_nme": "Foundation",
                    "child_status": "Pending"
                },
                {
                    "task_nme": "Framing",
                    "child_status": "Pending"
                },
                {
                    "task_nme": "MEP Systems",
                    "child_status": "Pending"
                },
                {
                    "task_nme": "Insulation & Drywall",
                    "child_status": "Pending"
                },
                {
                    "task_nme": "Interior Finishes",
                    "child_status": "Pending"
                },
                {
                    "task_nme": "Exterior Finishes",
                    "child_status": "Pending"
                },
                {
                    "task_nme": "Final Inspections",
                    "child_status": "Pending"
                }
            ]
        },
        {
            "name": "TASK - 002553",
            "assigned_to_name": null,
            "status": "Overdue",
            "exp_start_date": "2024-08-21",
            "exp_end_date": "2024-08-21",
            "team": "Design",
            "stages": "Construction",
            "task_description_1": null,
            "sub_status": "Not yet started",
            "parent_task": null,
            "subject": "Blue Tape walk",
            "priority": "Low",
            "file_urls": [],
            "child_table": [
                {
                    "task_nme": "Punch list items conclusion",
                    "child_status": "Pending"
                }
            ]
        }
    ]

const projectData = [
    {
        "name": "PROJ-0006",
        "project_name": "1919, 1921 & 2001 Potomac Dr, Houston, TX",
        "lot_area": 123,
        "lot_price": 123,
        "property_image": "/files/Gemini_Generated_Image_qafofsqafofsqafo.jpeg",
        "is_owned": 1,
        "expected_start_date": "2024-05-01",
        "expected_end_date": "2025-04-30"
    },
    {
        "name": "PROJ-0007",
        "project_name": "3224 Amherst Ave, Dallas, TX",
        "lot_area": 123,
        "lot_price": 123,
        "property_image": "/files/Gemini_Generated_Image_qafofpqafofpqafo.jpeg",
        "is_owned": 1,
        "expected_start_date": "2024-05-01",
        "expected_end_date": "2025-08-31"
    },
    {
        "name": "PROJ-0008",
        "project_name": "1001 E 7 ½ street, Houston, TX",
        "lot_area": 123,
        "lot_price": 123,
        "property_image": null,
        "is_owned": 1,
        "expected_start_date": "2024-06-01",
        "expected_end_date": "2025-07-01"
    },
    {
        "name": "PROJ-0009",
        "project_name": "4927 Heatherglen Dr, Houston, TX",
        "lot_area": 123,
        "lot_price": 123,
        "property_image": null,
        "is_owned": 1,
        "expected_start_date": "2024-06-01",
        "expected_end_date": "2025-07-01"
    },
    {
        "name": "PROJ-0010",
        "project_name": "1311 Pine Chase Dr, Houston, TX",
        "lot_area": 123,
        "lot_price": 123,
        "property_image": null,
        "is_owned": 0,
        "expected_start_date": "2024-06-01",
        "expected_end_date": "2025-07-01"
    }
];


export { tasksData, projectData }