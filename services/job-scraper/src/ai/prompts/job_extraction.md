You will be given the full textual content extracted from a PDF of a webpage that contains a job listing.

Your task is to identify **if there is exactly one job opportunity described** in the document.

- If there is one job opportunity, extract its key information and return it as a JSON object.
- If no job opportunity exists, respond with an empty JSON object `{}`.
- If there are multiple job opportunities, respond only with the **first one found**.

Extract and include these fields where possible:

{
"job_title": string, // The official title of the job
"company": string, // Company or organization offering the job
"location": string, // Job location or remote status
"employment_type": string, // e.g., Full-time, Part-time, Contract
"date_posted": string, // Date when the job was posted (ISO 8601 if possible)
"description": string, // Main job description text, concise but complete
"requirements": string, // Required skills, qualifications, or experience
"salary": string, // Salary info if mentioned
"application_url": string // URL or email for job application if present
}

Output **only the JSON object** — no explanations, no extra text.

If any field is missing or unavailable, omit that field from the JSON.
