using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Xml;
using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using System.Runtime.InteropServices;
using System.Diagnostics;

namespace ProcessApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcessController : ControllerBase
    {
        private readonly string _jsonFilePath;
        private List<Process> _Processes;

        public ProcessController(string jsonFilePath)
        {
            _jsonFilePath = jsonFilePath;

            ReadDataFromJsonFile();
        }

        public string ShowPath()
        {
            return this._jsonFilePath;
        }

        public void AddProcess(Process Process)
        {
            // Assign a unique ID to the new Process
            Process.Id = GetNextProcessId();

            if (Process.Subprocesses.Count > 0 )
            {
                AddFatherIdInSubprocess(Process);
            }

            _Processes.Add(Process);

            SaveDataToJsonFile();
        }

        public List<Process> GetAllProcesses()
        {
            return _Processes;
        }

        public Process GetProcessById(int id)
        {
            return _Processes.Find(p => p.Id == id);
        }

        public List<Subprocess> GetAllSubprocessesById(int id)
        {
            var process = _Processes.Find(p => p.Id == id);
            List<Subprocess> subprocessList = process.Subprocesses;

            return subprocessList;
        }

        public List<Subprocess> GetAllSubprocessesByProcess(Process process)
        {
            List<Subprocess> subprocessList = process.Subprocesses;

            return subprocessList;
        }

        public void UpdateProcess(Process updatedProcess)
        {
            var existingProcess = _Processes.Find(p => p.Id == updatedProcess.Id);
            if (existingProcess != null)
            {
                existingProcess.Name = updatedProcess.Name;
                existingProcess.Area = updatedProcess.Area;
                existingProcess.Description = updatedProcess.Description;

                SaveDataToJsonFile();
            }
        }

        public void DeleteProcess(int id)
        {
            _Processes.RemoveAll(p => p.Id == id);

            SaveDataToJsonFile();
        }

        public void AddSubprocess(Subprocess subprocess, int processId)
        {
            var process = _Processes.Find(p => p.Id == processId);
            if (process != null)
            {
                subprocess.Id = GetNextSubProcessId(process);
                process.Subprocesses.Add(subprocess);

                SaveDataToJsonFile();
            }   
        }

        public void UpdateSubprocess(Process updatedProcess)
        {
            var existingProcess = _Processes.Find(p => p.Id == updatedProcess.Id);
            if (existingProcess != null)
            {
                existingProcess.Subprocesses = updatedProcess.Subprocesses;

                SaveDataToJsonFile();
            }
        }

        private int GetNextProcessId()
        {
            return _Processes.Count > 0 ? _Processes.Max(p => p.Id) + 1 : 1;
        }

        private int GetNextSubProcessId(Process process)
        {
            return process.Subprocesses.Count > 0 ? process.Subprocesses.Max(s => s.Id) + 1 : 1;
        }

        private void ReadDataFromJsonFile()
        {
            if (System.IO.File.Exists(_jsonFilePath))
            {
                string jsonData = System.IO.File.ReadAllText(_jsonFilePath);
                _Processes = JsonConvert.DeserializeObject<List<Process>>(jsonData);
            }
            else
            {
                _Processes = new List<Process>();
            }
        }

        private void SaveDataToJsonFile()
        {
            string jsonData = JsonConvert.SerializeObject(_Processes, Newtonsoft.Json.Formatting.Indented);
            System.IO.File.WriteAllText(_jsonFilePath, jsonData);
        }

        private void AddFatherIdInSubprocess(Process process) 
        {
            foreach (Subprocess sub in process.Subprocesses)
            {
                sub.ProcessID = process.Id;
            }
        }

    }
}