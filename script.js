const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");
if (hamburger instanceof HTMLElement && navMenu instanceof HTMLElement) {
    const toggleMenu = () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    };
    hamburger.addEventListener("click", toggleMenu);
    // closing the menu when a link is clicked
    document.querySelectorAll("nav a").forEach((link) => {
        if (link instanceof HTMLElement) {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        }
    });
}
// _____ making general fields and methods that are use in multiple functions ____
const dateInput = () => {
    const startDate = document.createElement("input");
    startDate.type = "date";
    startDate.classList.add("start-date");
    startDate.required = true;
    const endDate = document.createElement("input");
    endDate.type = "date";
    endDate.classList.add("end-date");
    endDate.required = true;
    return [startDate, endDate];
};
const removeButton = (sectionContainer, containerDiv) => {
    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", () => {
        sectionContainer.removeChild(containerDiv);
    });
    return removeBtn;
};
const addEntry = (containerId, inputDetails, dateRequired) => {
    const container = document.getElementById(containerId);
    const entryDiv = document.createElement("div");
    entryDiv.classList.add(`${containerId.replace("-container", "")}-entry`);
    const row1 = document.createElement("div");
    row1.classList.add("row");
    inputDetails.forEach((detail) => {
        const input = document.createElement("input");
        input.type = "text";
        input.classList.add(`${detail}-input`);
        input.placeholder = `Enter ${detail}`;
        input.required = true;
        row1.appendChild(input);
    });
    entryDiv.appendChild(row1);
    if (dateRequired) {
        const row2 = document.createElement("div");
        row2.classList.add("row");
        const [startDate, endDate] = dateInput();
        row2.appendChild(startDate);
        row2.appendChild(endDate);
        entryDiv.appendChild(row2);
    }
    entryDiv.appendChild(removeButton(container, entryDiv));
    container.appendChild(entryDiv);
};
function addDynamicEducation() {
    addEntry("dynamic-education-container", ["education", "institution"], true);
}
function addDynamicSkill() {
    addEntry("dynamic-skill-container", ["skill"], false);
}
function addDynamicExperience() {
    addEntry("dynamic-experience-container", ["experience", "organization"], true);
}
function addEditableEducation() {
    addEntry("editable-education-container", ["education", "institution"], true);
}
function addEditableSkill() {
    addEntry("editable-skill-container", ["skill"], false);
}
function addEditableExperience() {
    addEntry("editable-experience-container", ["experience", "organization"], true);
}
function addShareableEducation() {
    addEntry("shareable-education-container", ["education", "institution"], true);
}
function addShareableSkill() {
    addEntry("shareable-skill-container", ["skill"], false);
}
function addShareableExperience() {
    addEntry("shareable-experience-container", ["experience", "organization"], true);
}
function generateResume(sectionName) {
    const fullName = document.getElementById(`${sectionName}-fullname`).value.trim();
    const occupation = document.getElementById(`${sectionName}-occupation`).value.trim();
    const email = document.getElementById(`${sectionName}-email`).value.trim();
    const phoneNumber = document.getElementById(`${sectionName}-phone-number`).value.trim();
    const address = document.getElementById(`${sectionName}-address`).value.trim();
    const linkedin = document.getElementById(`${sectionName}-linkedin`).value.trim();
    const summary = document.getElementById(`${sectionName}-summary`).value.trim();
    const imageInput = document.getElementById(`${sectionName}-image-input`).files?.[0];
    if (!fullName || !occupation || !email || !phoneNumber || !address || !summary || !imageInput) {
        alert(`Please fill all the required fields in ${sectionName} section!`);
        return;
    }
    const educationEntries = document.querySelectorAll(`.${sectionName}-education-entry`);
    const skillEntries = document.querySelectorAll(`.${sectionName}-skill-entry`);
    const experienceEntries = document.querySelectorAll(`.${sectionName}-experience-entry`);
    const box2 = document.querySelector(`.${sectionName}-box-2`);
    box2.innerHTML = '';
    const resumeHeader = document.createElement("div");
    resumeHeader.classList.add("resume-header");
    const userImage = document.createElement("img");
    const reader = new FileReader();
    reader.onload = function (e) {
        userImage.src = e.target?.result;
    };
    reader.readAsDataURL(imageInput);
    userImage.alt = `${fullName}'s Image`;
    userImage.classList.add("user-image");
    const nameHeading = document.createElement("h1");
    nameHeading.textContent = fullName;
    const occupationHeading = document.createElement("h2");
    occupationHeading.textContent = occupation;
    resumeHeader.appendChild(userImage);
    resumeHeader.appendChild(nameHeading);
    resumeHeader.appendChild(occupationHeading);
    box2.appendChild(resumeHeader);
    const contactDetailsDiv = document.createElement("div");
    contactDetailsDiv.classList.add("resume-contact");
    contactDetailsDiv.innerHTML = `
            <h3>Contact Details</h3>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone Number:</strong> ${phoneNumber}</p>
            <p><strong>Address:</strong> ${address}</p>
            ${linkedin ? `<p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>` : ''}
        `;
    box2.appendChild(contactDetailsDiv);
    const summaryDiv = document.createElement("div");
    summaryDiv.classList.add("resume-summary");
    summaryDiv.innerHTML = `
            <h3>Summary</h3>
            <p>${summary}</p>
        `;
    box2.appendChild(summaryDiv);
    // appending if fields exists
    if (educationEntries.length > 0) {
        const educationDiv = document.createElement("div");
        educationDiv.classList.add("resume-education");
        if (sectionName === "editable" || sectionName === "shareable") {
            educationDiv.setAttribute("contenteditable", "true");
        }
        educationDiv.innerHTML = `<h3>Education</h3>`;
        educationEntries.forEach(entry => {
            const education = entry.querySelector(".education-input").value.trim();
            const institution = entry.querySelector(".institution-input").value.trim();
            const startDate = entry.querySelector(".start-date").value;
            const endDate = entry.querySelector(".end-date").value;
            educationDiv.innerHTML += `
                    <p><strong>${education}</strong> at ${institution} (${startDate} - ${endDate})</p>
                `;
        });
        box2.appendChild(educationDiv);
    }
    if (skillEntries.length > 0) {
        const skillsDiv = document.createElement("div");
        skillsDiv.classList.add("resume-skills");
        if (sectionName === "editable" || sectionName === "shareable") {
            skillsDiv.setAttribute("contenteditable", "true");
        }
        skillsDiv.innerHTML = `<h3>Skills</h3><ul>`;
        skillEntries.forEach(entry => {
            const skill = entry.querySelector(".skill-input").value.trim();
            skillsDiv.innerHTML += `<li>${skill}</li>`;
        });
        skillsDiv.innerHTML += `</ul>`;
        box2.appendChild(skillsDiv);
    }
    if (experienceEntries.length > 0) {
        const experienceDiv = document.createElement("div");
        experienceDiv.classList.add("resume-experience");
        if (sectionName === "editable" || sectionName === "shareable") {
            experienceDiv.setAttribute("contenteditable", "true");
        }
        experienceDiv.innerHTML = `<h3>Experience</h3>`;
        experienceEntries.forEach(entry => {
            const experience = entry.querySelector(".experience-input").value.trim();
            const organization = entry.querySelector(".organization-input").value.trim();
            const startDate = entry.querySelector(".start-date").value;
            const endDate = entry.querySelector(".end-date").value;
            experienceDiv.innerHTML += `
                    <p><strong>${experience}</strong> at ${organization} (${startDate} - ${endDate})</p>
                `;
        });
        box2.appendChild(experienceDiv);
    }
    if (sectionName === "editable" || sectionName === "shareable") {
        resumeHeader.setAttribute("contenteditable", "true");
        nameHeading.setAttribute("contenteditable", "true");
        occupationHeading.setAttribute("contenteditable", "true");
        contactDetailsDiv.setAttribute("contenteditable", "true");
        summaryDiv.setAttribute("contenteditable", "true");
    }
    if (sectionName === "shareable") {
        const shareableBox = document.querySelector("#generated-shareable-container");
        shareableBox.innerHTML = '';
        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add("shareable-button-container");
        buttonDiv.innerHTML = `
        <button type="button" id="download-resume">Download <i class="fa-solid fa-download"></i></button>
        <button type="button" id="share-resume">Share <i class="fa-solid fa-square-arrow-up-right"></i></button>
        `;
        shareableBox.appendChild(box2);
        shareableBox.appendChild(buttonDiv);
        const downloadButton = document.getElementById('download-resume');
        const shareButton = document.getElementById('share-resume');
        if (downloadButton) {
            downloadButton.addEventListener('click', downloadAsPDF);
        }
        if (shareButton) {
            shareButton.addEventListener('click', shareResume);
        }
    }
    alert("Generated Successfully, scroll down to view.");
}
const generateDynamicResume = () => {
    generateResume("dynamic");
};
const generateEditableResume = () => {
    generateResume("editable");
};
const generateShareableResume = () => {
    generateResume("shareable");
};
function downloadAsPDF() {
    const resumeContent = document.querySelector('.shareable-box-2');
    if (!resumeContent)
        return;
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDocument) {
        iframeDocument.write(`
            <html>
            <head>
                <link rel="stylesheet" href="./style.css" />
                <style>
                    h1 { -webkit-text-fill-color: black; }
                    .resume-header { border-bottom: 2px solid; }
                    body { font-family: Arial, sans-serif; }
                </style>
            </head>
            <body>
                ${resumeContent.innerHTML}
            </body>
            </html>
        `);
        iframeDocument.close();
    }
    iframe.contentWindow?.print();
    setTimeout(() => {
        document.body.removeChild(iframe);
    }, 5000);
}
function generateUniqueURL(username) {
    const baseURL = 'https://giaic-resumaker.vercel.app/resume/';
    const timestamp = Date.now();
    return `${baseURL}${username}-${timestamp}`;
}
function shareResume() {
    const username = document.getElementById('shareable-fullname').value.trim().toLowerCase().replace(/\s+/g, '-');
    const uniqueURL = generateUniqueURL(username);
    confirm(`Share this URL: ${uniqueURL}`);
}
const sectionFunctions = {
    dynamic: {
        addSkill: addDynamicSkill,
        addEducation: addDynamicEducation,
        addExperience: addDynamicExperience,
        generateResume: generateDynamicResume,
    },
    editable: {
        addSkill: addEditableSkill,
        addEducation: addEditableEducation,
        addExperience: addEditableExperience,
        generateResume: generateEditableResume,
    },
    shareable: {
        addSkill: addShareableSkill,
        addEducation: addShareableEducation,
        addExperience: addShareableExperience,
        generateResume: generateShareableResume,
    },
};
document.addEventListener("DOMContentLoaded", () => {
    function name(sectionName) {
        const functions = sectionFunctions[sectionName];
        if (functions) {
            document.querySelector(`.${sectionName}-add-skills`)?.addEventListener("click", functions.addSkill);
            document.querySelector(`.${sectionName}-add-education`)?.addEventListener("click", functions.addEducation);
            document.querySelector(`.${sectionName}-add-experience`)?.addEventListener("click", functions.addExperience);
            document.querySelector(`#generate-${sectionName}`)?.addEventListener("click", functions.generateResume);
        }
    }
    name("dynamic");
    name("editable");
    name("shareable");
});
export {};
