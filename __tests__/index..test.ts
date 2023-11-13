import request from 'supertest';
import app from '../src/app'; // Import your Express app

describe('GET request to /admin', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/admin');
    expect(response.status).toBe(200);
  });
});


describe('POST request to /product/create', () => {
    it('should return status 201', async () => {
      const userData = {
        // Define the data you want to send in the POST request body
        fullname: 'John Doe',
        email: 'johndoe@example.com',
        gender: 'Male',
        // Add other required fields
      };
  
      const response = await request(app)
        .post('/product/create') // Update the URL to match your route
        .send(userData);
  
      expect(response.status).toBe(201);
    });
  });
  
  describe('PUT request to /product/update/1', () => {
    it('should return status 200', async () => {
      const updatedUserData = {
        // Define the data you want to update in the PUT request body
        fullname: 'Updated Name',
        // Add other updated fields
      };
  
      const response = await request(app)
        .put('/product/update/1') // Update the URL to match your route
        .send(updatedUserData);
  
      expect(response.status).toBe(200);
    });
  });
  
//   describe('DELETE request to /product/delete/1', () => {
//     it('should return status 204', async () => {
//       const response = await request(app)
//         .delete('/product/delete/1') // Update the URL to match your route
//         .send();
  
//       expect(response.status).toBe(204);
//     });
//   });
  // ...
  