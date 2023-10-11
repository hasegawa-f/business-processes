using System;
using System.Collections.Generic;
using ProcessApp.Controllers;
using ProcessApp;
using System.Xml.Linq;

namespace ProcessApp;
class MainProgram
{
    static void Main(string[] args)
    {
        string jsonFilePath = "..\\..\\..\\database.json";
        var processController = new ProcessController(jsonFilePath);

        while (true)
        {
            Console.WriteLine("\n\nChoose an option:");
            Console.WriteLine("1. Add Process");
            Console.WriteLine("2. List Processes");
            Console.WriteLine("3. View Process By ID");
            Console.WriteLine("4. Update Process");
            Console.WriteLine("5. Delete Process");
            Console.WriteLine("6. View SubProcess By ID");
            Console.WriteLine("7. Add Subprocess (By Process ID)");
            Console.WriteLine("8: Update Subprocess");
            Console.WriteLine("0. Exit");

            if (int.TryParse(Console.ReadLine(), out int choice))
            {
                switch (choice)
                {
                    case 1:
                        // Create
                        Console.Write("Enter Process name: ");
                        var name = Console.ReadLine();
                        Console.Write("Enter Process Area: ");
                        var area = Console.ReadLine();
                        Console.Write("Enter Process Description: ");
                        var description = Console.ReadLine();
                        var newProcess = new Process { Name = name, Area = area, Description = description, Subprocesses = new List<Subprocess>() };
                        Console.Write("Does this process have subprocess (y/n)? ");
                        var option = Console.ReadLine();
                        if (option == "y" || option == "Y")
                        {
                            var stop = "y";
                            var subId = 1;
                            while (stop == "y" || stop == "Y")
                            {
                                Console.Write("Add a new subprocess (y/n)? ");
                                stop = Console.ReadLine();
                                if (stop != "y" && stop != "Y" && stop != "n" && stop != "N")
                                {
                                    Console.WriteLine("Invalid option, aborting subprocess addition.");
                                }
                                else if (stop == "y" || stop == "Y")
                                {
                                    Console.Write("Enter the subprocess name: ");
                                    var subName = Console.ReadLine();
                                    Console.Write("Enter the subprocess area: ");
                                    var subArea = Console.ReadLine();
                                    Console.Write("Enter the subprrocess description: ");
                                    var subDescription = Console.ReadLine();
                                    var newSubProcess = new Subprocess { Id = subId, Name = subName, Area = subArea, Description = subDescription };
                                    newProcess.Subprocesses.Add(newSubProcess);
                                    subId++;
                                }
                            }
                        }
                        else if (option != "n" && option != "N")
                        {
                            Console.WriteLine("Inavlid option. Process will be created without subprocesses.");
                        }
                        processController.AddProcess(newProcess);
                        break;
                    case 2:
                        // Read (List)
                        var processes = processController.GetAllProcesses();
                        Console.WriteLine("\n\n");
                        foreach (var process in processes)
                        {
                            Console.WriteLine($"Id: {process.Id}\nName: {process.Name}\nArea: {process.Area} \nDescription: {process.Description}\n");
                            Console.WriteLine($"Subprocesses: \n");
                            if (process.Subprocesses.Count != 0)
                            {
                                foreach (var subprocess in process.Subprocesses)
                                {
                                    Console.WriteLine($"Name: {subprocess.Name}");
                                    Console.WriteLine($"Area: {subprocess.Area}");
                                    Console.WriteLine($"Description: {subprocess.Description}\n");
                                }
                            }
                            else
                            {
                                Console.WriteLine("No subprocesses found.");
                            }
                            Console.WriteLine("--------------------------------------");
                        }
                        break;
                    case 3:
                        // Read (View)
                        Console.Write("Enter process ID to view: ");
                        if (int.TryParse(Console.ReadLine(), out int viewId))
                        {
                            var process = processController.GetProcessById(viewId);
                            if (process != null)
                            {
                                Console.WriteLine($"Id: {process.Id}\nName: {process.Name}\nArea: {process.Area} \nDescription: {process.Description}\n");
                                Console.WriteLine($"Subprocesses: \n");
                                if (process.Subprocesses.Count != 0)
                                {
                                    foreach (var subprocess in process.Subprocesses)
                                    {
                                        Console.WriteLine($"Name: {subprocess.Name}");
                                        Console.WriteLine($"Area: {subprocess.Area}");
                                        Console.WriteLine($"Description: {subprocess.Description}\n");
                                    }
                                }
                                else
                                {
                                    Console.WriteLine("No subprocesses found.");
                                }
                            }
                            else
                            {
                                Console.WriteLine("Process not found.");
                            }
                        }
                        else
                        {
                            Console.WriteLine("Invalid ID.");
                        }
                        break;
                    case 4:
                        // Update
                        Console.Write("Enter process ID to update: ");
                        if (int.TryParse(Console.ReadLine(), out int updateId))
                        {
                            var processToUpdate = processController.GetProcessById(updateId);
                            if (processToUpdate != null)
                            {
                                Console.Write("Enter updated name: ");
                                processToUpdate.Name = Console.ReadLine();
                                Console.Write("Enter updated area: ");
                                processToUpdate.Area = Console.ReadLine();
                                Console.Write("Enter updated description: ");
                                processToUpdate.Description = Console.ReadLine();
                                processController.UpdateProcess(processToUpdate);

                                Console.WriteLine("\nProcess updated successfully!\n");
                            }
                            else
                            {
                                Console.WriteLine("\nProcess not found.\n");
                            }
                        }
                        else
                        {
                            Console.WriteLine("\nInvalid ID.\n");
                        }
                        break;
                    case 5:
                        // Delete
                        Console.Write("Enter process ID to delete: ");
                        if (int.TryParse(Console.ReadLine(), out int deleteId))
                        {
                            processController.DeleteProcess(deleteId);
                            Console.WriteLine("\nProcess deleted successfully!\n");
                        }
                        else
                        {
                            Console.WriteLine("\nInvalid ID.\n");
                        }
                        break;
                    case 6:
                        // Subprocesses By ID
                        Console.Write("Enter process ID: ");
                        if (int.TryParse(Console.ReadLine(), out int readId))
                        {
                            var processToRead = processController.GetProcessById(readId);
                            if (processToRead != null)
                            {
                                var subprocesses = processController.GetAllSubprocessesById(readId);
                                Console.WriteLine($"Process: {processToRead.Name}\nSubprocesses: \n");
                                if (subprocesses.Count == 0)
                                {
                                    Console.WriteLine("No subprocess found.");
                                }
                                else
                                {
                                    foreach (var subprocess in subprocesses)
                                    {
                                        Console.WriteLine($"Name: {subprocess.Name}");
                                        Console.WriteLine($"Area: {subprocess.Area}");
                                        Console.WriteLine($"Description: {subprocess.Description}\n");
                                    }
                                }                                
                            }
                            else
                            {
                                Console.WriteLine("\nProcess not found!\n");
                            }
                        }
                        else
                        {
                            Console.WriteLine("\nInvalid ID!\n");
                        }
                        break;

                    case 7:
                        //Add Subprocess by ID
                        Console.Write("Enter process ID: ");
                        if (int.TryParse(Console.ReadLine(), out int searchId))
                        {
                            var processToRead = processController.GetProcessById(searchId);
                            if (processToRead != null)
                            {
                               Console.WriteLine("Process found!");
                               Console.Write("Enter Subprocess Name: ");
                               var newName = Console.ReadLine();
                               Console.Write("Enter Subprocess Area: ");
                               var newArea = Console.ReadLine();
                               Console.Write("Enter Subprocess Description: ");
                               var newDescription = Console.ReadLine();
                               var newSubProcess = new Subprocess { Name = newName, Area = newArea, Description = newDescription, ProcessID = searchId };
                               processController.AddSubprocess(newSubProcess, searchId);
                            }
                            else
                            {
                                Console.WriteLine("\nProcess not found!\n");
                            }
                        }
                        else
                        {
                            Console.WriteLine("\nInvalid ID!\n");
                        }
                        break;
                    case 8:
                        // Update Subprocess by Id
                        Console.Write("Enter process ID: ");
                        if (int.TryParse(Console.ReadLine(), out int fatherId))
                        {
                            var processToRead = processController.GetProcessById(fatherId);
                            if (processToRead != null)
                            {
                                Console.WriteLine("Process found!");
                                Console.Write("Enter subprocess ID: ");
                                if (int.TryParse(Console.ReadLine(), out int subId))
                                {
                                    bool hasId = processToRead.Subprocesses.Any(subP => subP.Id == subId);
                                    if (hasId)
                                    {
                                        Console.WriteLine("Subprocess found!");
                                        Console.Write("Enter Subprocess Name: ");
                                        var newName = Console.ReadLine();
                                        Console.Write("Enter Subprocess Area: ");
                                        var newArea = Console.ReadLine();
                                        Console.Write("Enter Subprocess Description: ");
                                        var newDescription = Console.ReadLine();
                                        processToRead.Subprocesses[subId - 1].Name = newName;
                                        processToRead.Subprocesses[subId - 1].Area = newArea;
                                        processToRead.Subprocesses[subId - 1].Description = newDescription;
                                        processController.UpdateSubprocess(processToRead);

                                        Console.WriteLine("\nSubprocess updated successfully\n");
                                    }
                                    else
                                    {
                                        Console.WriteLine("\nSubprocess not found!\n");
                                    }
                                }
                                else
                                {
                                    Console.WriteLine("\nInvalid ID!\n");
                                }
                            }
                            else
                            {
                                Console.WriteLine("\nProcess not found!\n");
                            }
                        }
                        else
                        {
                            Console.WriteLine("\nInvalid ID!\n");
                        }
                        break;
                    case 0:
                        // Exit
                        Environment.Exit(0);
                        break;
                    default:
                        Console.WriteLine("\nInvalid choice. Please try again.\n");
                        break;
                }
            }
            else
            {
                Console.WriteLine("\nInvalid choice. Please try again.\n");
            }
        }
    }
}
