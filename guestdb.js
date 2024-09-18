import fs from 'fs';
import ch from 'chalk';

const filePath = './guestData.json';

// Helper function to read data from the file
const loadGuestData = () => {
   let guestData = []; // Explicitly declare an empty array
 
   try {
     const dataBuffer = fs.readFileSync(filePath); // Read the file
     const dataJSON = dataBuffer.toString();       // Convert buffer to string
     guestData = JSON.parse(dataJSON);             // Parse JSON and assign it to the array
   } catch (e) {
     // If an error occurs, guestData will remain the empty array declared at the top
     console.log('Error reading file or file not found. Initializing empty guest data.');
   }
 
   return guestData; // Return the array, either populated or empty
};

// Helper function to save data to the file
const saveGuestData = (data) => {
  const dataJSON = JSON.stringify(data);
  fs.writeFileSync(filePath, dataJSON);
};

export const addguest = (guest) => {
  const guestData = loadGuestData();
  guestData.push(guest); // Add the guest to the array
  saveGuestData(guestData);
  
};

export const readguest = (id) => {
  const guestData = loadGuestData();
  return guestData.find(guest => guest.id === id); // Find guest by ID
};

export const updateguest = (updatedGuest) => {
   const { id, name, address, contact_no, visite_date } = updatedGuest;
   
   // Load existing guest data
   const guestData = loadGuestData();
   
   // Find the index of the guest with the specified ID
   const guestIndex = guestData.findIndex(guest => guest.id === id);
   
   // Check if guest with the given ID exists
   if (guestIndex !== -1) {
     // Update guest details
     guestData[guestIndex] = {
       ...guestData[guestIndex],
       name: name || guestData[guestIndex].name,
       address: address || guestData[guestIndex].address,
       contact_no: contact_no || guestData[guestIndex].contact_no,
       visite_date: visite_date || guestData[guestIndex].visite_date
     };
     
     // Save the updated guest data
     saveGuestData(guestData);
     
     
   } else {
     console.log(ch.red(`Guest with ID: ${id} not found.`));
   }
 };
 

export const deleteguest = (id) => {
  const guestData = loadGuestData();
  const guestIndex = guestData.findIndex(guest => guest.id === id);

  if (guestIndex !== -1) {
    guestData.splice(guestIndex, 1); // Remove the guest from the array
    saveGuestData(guestData); // Save the updated array
    
  } else {
    console.log(ch.red(`Guest with ID: ${id} not found.`));
  }
};

export const listguest = () => {
  console.log(ch.green("Guest listed"));
  const guestData = loadGuestData();
  guestData.forEach(guest => {
    console.log(`ID: ${guest.id}, Name: ${guest.name}, Address: ${guest.address}, Contact No.: ${guest.contact_no}, Visit Date: ${guest.visite_date}`);
  });
};
