# Calculator API

![Node.js](https://img.shields.io/badge/Node.js-16.x-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-brightgreen)
![Redis](https://img.shields.io/badge/Redis-6.x-red)
![Docker](https://img.shields.io/badge/Docker-20.x-blue)
![Postman](https://img.shields.io/badge/Postman-Test-orange)

A scalable API for basic arithmetic operations with features like input validation, caching, error handling, and monitoring.

## **Progress**

# Feature Checklist

- [ ] **API Endpoint**: Accepts two numbers and an operation type.
- [ ] **Supported Operations**: Addition (+), Subtraction (-), Multiplication (*), Division (/).

- [ ] **Asynchronous Processing**: Use asynchronous handling (e.g., Promises) to ensure a non-blocking API flow.

- [ ] **Database Integration**: Log all requests and responses in a MongoDB database, including:
  - [ ] Operation type.
  - [ ] Input numbers.
  - [ ] Calculated result.
  - [ ] Request timestamp.
  - [ ] Response time.

- [ ] **Caching**: Implement Redis to cache results for repeated calculations with a TTL (e.g., 60 seconds).

- [ ] **Input Validation**: Validate inputs using libraries like Joi or Yup to handle:
  - [ ] Non-numeric inputs.
  - [ ] Division by zero.
  - [ ] Missing/invalid operation type.
  - [ ] Excessive input size.

- [ ] **Error Handling**: Return detailed error messages in a consistent JSON format with appropriate HTTP status codes:
  - [ ] `400 Bad Request` for invalid inputs.
  - [ ] `404 Not Found` for unsupported operations.
  - [ ] `500 Internal Server Error` for unexpected issues.

- [ ] **Response Format**: Return results in a JSON structure:
  ```json
  {
      "status": "success",
      "operation": "<operation>",
      "inputs": {
          "number1": <number1>,
          "number2": <number2>
      },
      "result": <result>,
      "timestamp": "<timestamp>",
      "responseTime": "<response_time_in_ms>"
  }
  ```

- [ ] **Scalability**: Ensure the API is stateless and handles concurrent requests efficiently.

- [ ] **Deployability**: Deploy with scalable tools like Docker and Kubernetes.

- [ ] **Security**: Use HTTPS for secure communication.
  - [ ] Implement rate-limiting to prevent abuse.
  - [ ] Sanitize inputs to guard against injection attacks.
  - [ ] Protect sensitive data and handle CORS.

- [ ] **Testing**: Create unit and integration tests for:
  - [ ] Successful operations.
  - [ ] Edge cases (e.g., division by zero).
  - [ ] Error-handling scenarios.

- [ ] **Testing Frameworks**: Use testing frameworks like Jest or Mocha.

- [ ] **API Documentation**: Provide comprehensive Swagger/OpenAPI documentation detailing endpoints, parameters, and example responses.

- [ ] **Deployment**: Deploy to a cloud platform like AWS, GCP, or Azure.

- [ ] **CI/CD**: Use CI/CD pipelines for automated testing and seamless deployment.

- [ ] **Monitoring**: Use tools like Prometheus and Grafana for health, latency, and error rate tracking.
  - [ ] Log performance metrics centrally with tools like ElasticSearch or CloudWatch.

- [ ] **Versioning**: Implement versioning (e.g., `/v1/`) to accommodate future updates without disrupting existing clients.

---

## **Usage**

1. Clone the repo:
   ```bash
   git clone https://github.com/Txaverria/Calculate-API-Endpoint.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure `.env`:
   ```plaintext
   PORT=3000
   REDIS_HOST=localhost
   REDIS_PORT=6379
   MONGO_URI=INPUT_YOUR_OWN_MONGO_URI
   ```
4. Start the server:
   ```bash
   npm start
   ```
5. Access the API: `http://localhost:3000/api/v2/calculate` (for the v2 version incl)

## **Original Project Instructions**

This project outlines the development of a scalable, secure, and efficient API endpoint for basic arithmetic operations with the following key features and requirements:

### **Core Functionality**
- **API Endpoint**: Accepts two numbers and an operation type.
- **Supported Operations**: Addition (+), Subtraction (-), Multiplication (*), Division (/).

---

### **Advanced Requirements**

#### **Backend Architecture**
1. **Asynchronous Processing**:
   - Use asynchronous handling (e.g., Promises) to ensure a non-blocking API flow.
2. **Database Integration**:
   - Log all requests and responses in a MongoDB database, including:
     - Operation type.
     - Input numbers.
     - Calculated result.
     - Request timestamp.
     - Response time.
3. **Caching**:
   - Implement Redis to cache results for repeated calculations with a TTL (e.g., 60 seconds).

#### **Input Validation**
- Validate inputs using libraries like Joi or Yup to handle:
  - Non-numeric inputs.
  - Division by zero.
  - Missing/invalid operation type.
  - Excessive input size.

#### **Error Handling**
- Return detailed error messages in a consistent JSON format with appropriate HTTP status codes:
  - `400 Bad Request` for invalid inputs.
  - `404 Not Found` for unsupported operations.
  - `500 Internal Server Error` for unexpected issues.

#### **Response Format**
- Return results in a JSON structure:
  ```json
  {
      "status": "success",
      "operation": "<operation>",
      "inputs": {
          "number1": <number1>,
          "number2": <number2>
      },
      "result": <result>,
      "timestamp": "<timestamp>",
      "responseTime": "<response_time_in_ms>"
  }
  ```

---

### **Additional Requirements**

#### **Scalability**
- Ensure the API is stateless and handles concurrent requests efficiently.
- Deploy with scalable tools like Docker and Kubernetes.

#### **Security**
- Use HTTPS for secure communication.
- Implement rate-limiting to prevent abuse.
- Sanitize inputs to guard against injection attacks.
- Protect sensitive data and handle CORS.

#### **Testing**
- Create unit and integration tests for:
  - Successful operations.
  - Edge cases (e.g., division by zero).
  - Error-handling scenarios.
- Use testing frameworks like Jest or Mocha.

#### **API Documentation**
- Provide comprehensive Swagger/OpenAPI documentation detailing endpoints, parameters, and example responses.

#### **Deployment**
- Deploy to a cloud platform like AWS, GCP, or Azure.
- Use CI/CD pipelines for automated testing and seamless deployment.

#### **Monitoring**
- Use tools like Prometheus and Grafana for health, latency, and error rate tracking.
- Log performance metrics centrally with tools like ElasticSearch or CloudWatch.

#### **Versioning**
- Implement versioning (e.g., `/v1/`) to accommodate future updates without disrupting existing clients.

This project ensures a robust, user-friendly API designed for efficiency, scalability, and security.