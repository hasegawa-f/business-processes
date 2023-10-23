import axios from "axios";


const api = axios.create({
  baseURL: 'https://localhost:7185/',
});

export const fetchProcessDataFromAPI = () => {
  return api
    .get('/Process')
    .then((response) => response.data)
    .catch((error) => {
      console.error('An error occurred while fetching data:', error);
      throw error;
    });
};

export const fetchSingleProcessFromAPI = (id) => {
  return api.get(`/Process/${id}`);
};

export const postProcessToAPI = (dataToPost) => {
  api
    .post('/Process', dataToPost)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error('An error occurred while adding data:', error);
    });
};

export const updateProcessToAPI = (id, process) => {
  api
    .put(`/Process/${id}`, process)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error('An error ocurred while updating data', error);
    });
}

export const deleteProcessFromAPI = (id) => {
  api
    .delete(`/Process/${id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error('An error ocurred while updating data', error);
    });
}

export const fetchDepartmentDataFromAPI = () => {
  return api
    .get('/Department')
    .then((response) => response.data)
    .catch((error) => {
      console.error('An error occurred while fetching data:', error);
      throw error;
    });
};

export const fetchSingleDepartmentFromAPI = (id) => {
  return api.get(`/Department/${id}`);
};

export const postDepartmentToAPI = (dataToPost) => {
  api
    .post('/Department', dataToPost)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error('An error occurred while adding data:', error);
    });
};

export const updateDepartmentToAPI = (id, department) => {
  api
    .put(`/Department/${id}`, department)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error('An error ocurred while updating data', error);
    });
}

export const deleteDepartmentFromAPI = (id) => {
  api
    .delete(`/Department/${id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error('An error ocurred while updating data', error);
    });
}

// https://jsonplaceholder.typicode.com/todos