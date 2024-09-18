import { addguest, updateguest, deleteguest, readguest, listguest } from './guestdb.js';  // ES module import
import chalk from 'chalk';
import yargs from 'yargs';

// Process command-line arguments
const argv = yargs(process.argv.slice(2))
  .version("1.1.2")

  //add a new GuestDB instance
  .command({
    command: 'add',
    describe: 'Add new Guest',
    builder: {
      id: {
            describe: 'Guest ID',
            demandOption: true,
            type: 'string'
          },
      name: {
        describe: 'Guest name',
        demandOption: true,
        type: 'string'
      },
      address: {
        describe: 'Guest address',
        demandOption: true,
        type: 'string'
      },
      contact_no: {
        describe: 'Guest contact number',
        demandOption: true,
        type: 'string'
      },
      visite_date: {
        describe: 'Visit date',
        demandOption: true,
        type: 'string'
      }
    },
    handler: function (argv) {
      addguest({
        id: argv.id,
        name: argv.name,
        address: argv.address,
        contact_no: argv.contact_no,
        visite_date: argv.visite_date,
        
      });

      console.log(chalk.blue("Successfully added guest details"));
        
    }
  })

  // update the guest details
  .command({
    command: 'update',
    describe: 'Update Guest Values',
    builder: {
      id: {
        describe: 'Guest ID',
        demandOption: true,
        type: 'string'
      },
      name: {
        describe: 'New guest name',
        type: 'string'
      },
      address: {
        describe: 'New guest address',
        type: 'string'
      },
      contact_no: {
        describe: 'New guest contact number',
        type: 'string'
      },
      visite_date: {
        describe: 'New visit date',
        type: 'string'
      }
    },
    handler: function (argv) {
      updateguest({
        id: argv.id,
        name: argv.name,
        address: argv.address,
        contact_no: argv.contact_no,
        visite_date: argv.visite_date
      });
      console.log(chalk.blue(`Guest with ID: ${argv.id} has been updated.`));
    }
  })

  //delete a guest details
  .command({
  command: 'delete',
  describe: 'Delete Guest Details',
  builder: {
    id: {
      describe: 'Guest ID',
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (argv) {
    deleteguest(argv.id); // Pass only the id to deleteguest
    console.log(chalk.blue(`Guest with ID: ${argv.id} has been deleted.`));
  }
})

  //Read the guest details
  .command({
    command: 'read',
    describe: 'Guest Details',
    builder: {
      id: {
        describe: 'Guest ID',
        demandOption: true,
        type: 'string'
      }
    },
    handler: function (argv) {
      const guest = readguest(argv.id);
      if (guest) {
        console.log(chalk.blue(`Guest ${guest.id}`));
        console.log(`Name: ${guest.name}`);
        console.log(`Address: ${guest.address}`);
        console.log(`Contact Number: ${guest.contact_no}`);
        console.log(`Visit Date: ${guest.visite_date}`);
      } else {
        console.log(chalk.red(`Guest with ID: ${argv.id} not found.`));
      }
    }
  })
  

  //List all guests
  .command({
    command: 'list',
    describe: 'List all Guests',
    builder: {
      // Remove the 'id' argument from the builder as it's not needed for listing all guests
      name: {
        describe: 'New guest name',
        type: 'string'
      },
      address: {
        describe: 'New guest address',
        type: 'string'
      },
      contact_no: {
        describe: 'New guest contact number',
        type: 'string'
      },
      visite_date: {
        describe: 'New visit date',
        type: 'string'
      }
    },
    handler: function (argv) {
      listguest(); // Call listguest without arguments
      console.log(chalk.blue("Successfully Listed all Guests"));
    }
  })
  

  
  .help()
  .argv;


console.log('yargs.argv:', argv);
