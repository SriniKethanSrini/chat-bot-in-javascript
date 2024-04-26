
const educationSchemes = [
    { name: "Scheme 1", description: "Description of Scheme 1" },
    { name: "Scheme 2", description: "Description of Scheme 2" },
    {name: "Scheme 3", description: "Description of Scheme 3"},
    {name: "Scheme 4", description: "Description of Scheme 4"},
    {name: "Scheme 5", description: "Description of Scheme 5"}
    
];

const healthSchemes = [
    { name: "Scheme 1", description: "Description of Scheme 1" },
    { name: "Scheme 2", description: "Description of Scheme 2" },
    {name: "Scheme 3", description: "Description of Scheme 3"},
    {name: "Scheme 4", description: "Description of Scheme 4"},
    {name: "Scheme 5", description: "Description of Scheme 5"}
];

const loansSchemes = [
    { name: " Scheme 1", description: "Description of Loan Scheme 1" },
    { name: "Scheme 2 ", description: "Description of Loan Scheme 2" },
    {name: "Scheme 3", description: "Description of Scheme 3"},
    {name: "Scheme 4", description: "Description of Scheme 4"},
    {name: "Scheme 5", description: "Description of Scheme 5"}
];

const pensionSchemes = [
    { name: "Scheme 1", description: "Description of Pension Scheme 2" },
    { name: " Scheme 2", description: "Description of Pension Scheme 1" },
    {name: "Scheme 3", description: "Description of Scheme 3"},
    {name: "Scheme 4", description: "Description of Scheme 4"},
    {name: "Scheme 5", description: "Description of Scheme 5"}
    // Add more schemes
];

async function fetchResponses() {
    try {
        const response = await fetch('responses.json'); // Assuming responses are stored in responses.json
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        return {}; // Return empty object if there's an error
    }
}

// Function to populate schemes dynamically
function populateSchemes(category, schemes) {
    const schemeList = document.getElementById(category + "Schemes");
    schemeList.innerHTML = "";
    schemes.forEach((scheme, index) => {
        const schemeItem = document.createElement('div');
        schemeItem.className = 'scheme';

        // Create anchor tag around the scheme name
        const schemeNameLink = document.createElement('a');
        schemeNameLink.textContent = scheme.name;
        schemeNameLink.href = 'scheme-details.html'; // Default link to the scheme details page
        schemeNameLink.title = scheme.description;

        // Create description paragraph
        const description = document.createElement('p');
        description.className = 'scheme-description';
        description.textContent = scheme.description;
        description.style.display = 'none';

        // Append scheme name and description to scheme item
        schemeItem.appendChild(schemeNameLink);
        schemeItem.appendChild(description);

        // Add event listener to scheme name link
        schemeNameLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            // Dynamically change the link based on the scheme index
            schemeNameLink.href = `scheme-details-${category.toLowerCase()}-${index + 1}.html`; // Assuming scheme details pages follow a naming convention
            window.location.href = schemeNameLink.href; // Redirect to the individual scheme details page
        });

        // Append scheme item to scheme list
        schemeList.appendChild(schemeItem);
    });
}

// Function to toggle scheme description visibility
function toggleDescription(description) {
    description.style.display = description.style.display === 'none' ? 'block' : 'none';
}

// Populate schemes for each category
populateSchemes("education", educationSchemes);
populateSchemes("health", healthSchemes);
populateSchemes("loans", loansSchemes);
populateSchemes("pension", pensionSchemes);

// Chatbot functionality
const chatbotBtn = document.getElementById('chatbotBtn');
const chatbot = document.getElementById('chatbot');
const chatContainer = document.getElementById('chatContainer');
const chatDisplay = document.getElementById('chatDisplay');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const usermessage=document.getElementById('usermessage');
const botmessage=document.getElementById('botmessage');
let chatbotVisible = false; // Flag to track chatbot visibility

// Initially hide the chatbot container
chatbot.style.display = 'none';

// Add event listener to show the chatbot when a specific key is pressed
document.addEventListener('keypress', (e) => {
    if (e.key === 'c') { // Change 'c' to the desired key
        chatbot.style.display = 'block';
    }
});

chatbotBtn.addEventListener('click', () => {
    if (chatbotVisible) {
        chatbot.style.display = 'none';
        chatbotVisible = false;
    } else {
        chatbot.style.display = 'block';
        chatbotVisible = true;
    }
});

sendBtn.addEventListener('click', () => {
    sendMessage();
});

userInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        sendMessage();
    }
});

async function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;

    const userBubble = document.createElement('div');
    userBubble.className = 'user-bubble';
    userBubble.textContent = message;
    chatDisplay.appendChild(userBubble);

    // Check for keywords related to redirection
    if (message.toLowerCase().includes('call')) {
        const botBubble = document.createElement('div');
        botBubble.className = 'bot-bubble';
        botBubble.textContent = "Redirecting you to a phone call...";
        chatDisplay.appendChild(botBubble);
        setTimeout(() => {
            // Redirect to phone call functionality goes here
            window.location.href = 'tel:6380666426';
        }, 10000); // 10 seconds
    } else if (message.toLowerCase().includes('email')) {
        const botBubble = document.createElement('div');
        botBubble.className = 'bot-bubble';
        botBubble.textContent = "Redirecting you to email...";
        chatDisplay.appendChild(botBubble);
        setTimeout(() => {
            // Redirect to email functionality goes here
            window.location.href = 'mailto:smsrinikethan@gmail.com';
        }, 10000); // 10 seconds
    } else {
        // Example response from JSON data
        const response = await generateResponse(message); // Replace with your logic
        const botBubble = document.createElement('div');
        botBubble.className = 'bot-bubble';
        botBubble.textContent = response;
        chatDisplay.appendChild(botBubble);
    }

    userInput.value = '';

    // If chatbot is not visible after the conversation, reset chat display
    if (!chatbotVisible) {
        resetChatDisplay();
    }
}

// Example function to generate chatbot response from JSON data
async function generateResponse(message) {
    const responses = await fetchResponses();

    // Replace this logic with actual implementation to analyze JSON data and generate response
    const defaultMessage = "I'm sorry, I didn't understand that. Can you please rephrase?";
    message = message.toLowerCase();
    for (const keyword in responses) {
        if (message.includes(keyword)) {
            return responses[keyword];
        }
    }
    return defaultMessage;
}

// Function to reset chat display after conversation ends
function resetChatDisplay() {
    chatDisplay.innerHTML = ''; // Clear chat display
}

document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.getElementById('about');
    const governmentBlogSection = document.getElementById('government-blog');
    const showAboutBtn = document.getElementById('showAboutBtn');
    const showGovernmentBlogBtn = document.getElementById('showGovernmentBlogBtn');

    // Hide the about section initially
    aboutSection.classList.add('hidden');

    showAboutBtn.addEventListener('click', function() {
        // Toggle the visibility of the about section
        aboutSection.classList.toggle('hidden');
    });

    showGovernmentBlogBtn.addEventListener('click', function() {
        governmentBlogSection.classList.toggle('hidden');
    });

    // Redirect to government blog page
    showGovernmentBlogBtn.addEventListener('click', function() {
        window.location.href = 'https://www.tn.gov.in/ta/announcements/';
    });
});