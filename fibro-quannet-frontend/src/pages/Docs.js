import "../styles/Docs.css";

const Docs = () => {
  return (
    <div className="docs-view">
      <div className="docs-content">
        <h1>Fibro-QuanNet Documentation</h1>

        <p>
          Fibro QuanNet is a Machine Learning application developer to automate
          the process of prognosis prediction using Quantum Machine Learning.
        </p>

        <p>
          With the rapid emergence in our understanding in quantum physics and
          mechanics, scientists actively thrive to harness the physical
          capabilities and aspects of quantum mechanics to enhance and further
          develop our boundaries of communication and information processing.
          This has led to the development of quantum computing, which has
          demonstrated the ability to perform complex logical calculations and
          problem-solving that would have taken classical computers years to
          complete.
        </p>

        <h2>How to use Fibro-QuanNet?</h2>
        <p>
          Fibro-QuanNet is a very easy to use application. The following are
          steps to follow in-order to successfully predict the prognosis of a
          patient.
        </p>
        <ol>
          <li>
            Navigate to the <a href="/predict">Predict Tab</a> from the
            navigation bar at the top, where you will be presented with a form
            to fill in the patient's information.
          </li>
          <li>
            Upload the patients HRCT imagery in the form of a zip file. A
            minimum of 30 DICOM images are required. Please make sure you follow
            privacy laws and give your patient a unique ID instead of their name
            to protect privacy.
          </li>
          <li>Fill out the rest of the form with the patients information.</li>
          <li>
            Once you've filled in all the information of the patient, proceed to
            hit the "Predict Prognosis" button beneath the form.
          </li>
          <li>
            Please wait for the spinnner to finish, and you will be prompted
            with a table with all the prognosis predictions of the patient for a
            a span of 132 weeks.
          </li>
          <li>
            If you wish to download the report of prognosis predictions, you may
            do so throught the Download Predictions button above the table
            structure.
          </li>
        </ol>
        <p>
          The author wishes this application will allow you to predict the
          prognosis of the disease accurately and quickly, to be able to live a
          full life with fibrosis diagnosis, and to have a safe and functional
          medical trial.
        </p>
        <p>
          This project was developed as partial completion of my BEng (Hons)
          Software Engineering degree at the University of Westminster, for mt
          Final Project, 2023.
        </p>
        <br />
        <p>
          Signing off, Nuwin Godakanda Arachchi.<br />
          2019443 | W1761350
        </p>
      </div>
    </div>
  );
};

export default Docs;
