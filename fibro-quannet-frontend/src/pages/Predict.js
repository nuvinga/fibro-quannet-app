import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../styles/Predict.css"
import axios from "axios";
import Papa from "papaparse";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import exportFromJSON from "export-from-json";

const Predict = () => {
  const [file, setFile] = useState(null);
  const [predictionData, setPredictionData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsGenerating(true)
    setPredictionData(null)
    let weeks = e.target[1].value;
    let fvc = e.target[2].value;
    let percentage = e.target[3].value;
    let age = e.target[4].value;
    let sex = e.target[5].value;
    let smoking = e.target[6].value;

    console.log(file.name.split(".")[0])

    let data = [ file.name.split(".")[0], weeks, fvc, percentage, age, sex, smoking ];

    // Convert data to CSV
    const csv = Papa.unparse([data]);

    // Create new FormData object and append CSV data as a Blob
    const formData = new FormData();
    formData.append(
      "files[]",
      new Blob([csv], { type: "text/csv" }),
      "metadata.csv"
    );
    formData.append("files[]", file);

    // Send CSV data to API
    axios
      .post("http://127.0.0.1:8000/predict", formData)
      .then((response) => {
        setIsGenerating(false);
        setPredictionData(JSON.parse(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(e);
  }

  const exportCsv = () => {
    const fileName = "fibro-quannet-prediction"
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data: predictionData, fileName, exportType })
  }

  return (
    <div className="predict-box">
      <h1>Predict Prognosis of Pulmonary Fibrosis</h1>
      {!isGenerating && predictionData == null ? (
        <div className="upload-card">
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col className="col-8">
                <Form.Group controlId="formFileMultiple">
                  <Form.Label>Upload HRCT DICOM Zip</Form.Label>
                  <Form.Control
                    required
                    type="file"
                    accept=".zip"
                    multiple
                    onChange={handleFileUpload}
                  />
                </Form.Group>
              </Col>
              <Col className="col-4">
                <Form.Group as={Col} controlId="formGridWeeks">
                  <Form.Label>Week since Prognosis</Form.Label>
                  <Form.Control required type="number" />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridFVC">
                <Form.Label>Forced Volume Capacity</Form.Label>
                <Form.Control required />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPercentage">
                <Form.Label>Volume Percentage</Form.Label>
                <Form.Control required />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAge">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" min={1} max={150} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridGender">
                <Form.Label>Gender</Form.Label>
                <Form.Select required defaultValue="Male">
                  <option>Male</option>
                  <option>Female</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSmoking">
                <Form.Label>Smoking Status</Form.Label>
                <Form.Select required defaultValue="Never Smoked">
                  <option>Never Smoked</option>
                  <option>Ex-Smoker</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Predict Prognosis
            </Button>
          </Form>
        </div>
      ) : isGenerating ? (
        <div className="upload-card-loader">
          <Spinner animation="border" variant="success" />
        </div>
      ) : (
        <></>
      )}
      {predictionData != null ? (
        <div className="predictions-table">
          <Button variant="primary" type="submit" onClick={exportCsv}>
            Download Prediction
          </Button>
          <Table striped>
            <thead>
              <tr>
                <th>Week Number</th>
                <th>FVC</th>
                <th>Confidence</th>
              </tr>
            </thead>
            <tbody>
              {predictionData &&
                predictionData.map((row) => (
                  <tr>
                    <td>{row.Patient_Week.split("_")[1]}</td>
                    <td>{row.FVC}</td>
                    <td>{row.Confidence}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Predict;
