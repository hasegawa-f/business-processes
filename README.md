# business-processes
A simple software made for organizing (create, review, update, delete) possible processes that a businees may need.
Made with C# for back-end (using Entity Framework), React for the front-end and Postgres for the database.

The sql cript file 'table_creation_and_insertion' creates and populate the database with simple data.

To start the back-end, you need to run the dotnet project.
Inside the process-back directory, run 'dotnet build' and then 'dotnet run' from the terminal.
Or build and run from Visual Studio (version used: 2022)

To start the front-end, first install the necessary packages (run 'npm install' on 'process-front') and then use 'npm start'.

(ports used: :3000 for front-end and :7185 for back-end)
