const tableBody = document.getElementById('tableBody');
const form = document.getElementById('form');

// Function to get data from local storage or initialize an empty array
function getData() {
    const data = localStorage.getItem('data');
    return data ? JSON.parse(data) : [];
}

// Function to update the table with data
function displayData(data) {
    tableBody.innerHTML = ''; // Clear the table body
    data.forEach((item, index) => {
        const row = tableBody.insertRow();
        const idCell = row.insertCell();
        const nameCell = row.insertCell();
        const emailCell = row.insertCell();
        const actionsCell = row.insertCell();

        idCell.textContent = index + 1;
        nameCell.textContent = item.name;
        emailCell.textContent = item.email;

        // Add Edit and Delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            editRecord(index);
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteRecord(index);
        });

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
    });
}

// Function to add a new record
function addRecord(data) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    data.push({ name, email });
    localStorage.setItem('data', JSON.stringify(data));
    displayData(data);

    // Clear the form
    form.reset();
}

// Function to edit a record
function editRecord(index) {
    const data = getData();
    const record = data[index];

    // Pre-fill the form with existing data
    document.getElementById('name').value = record.name;
    document.getElementById('email').value = record.email;

    // Update the save button to handle editing
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        record.name = document.getElementById('name').value;
        record.email = document.getElementById('email').value;
        localStorage.setItem('data', JSON.stringify(data));
        displayData(data);
        form.reset();
    });
}

// Function to delete a record
function deleteRecord(index) {
    const data = getData();
    data.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(data));
    displayData(data);
}

// Load data on page load
const data = getData();
displayData(data);

// Handle form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    addRecord(data);
});