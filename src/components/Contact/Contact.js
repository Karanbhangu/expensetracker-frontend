import React from "react";
import AnimatedPage from "../AnimatedPage";

const Contact = () => {
  return (
    <AnimatedPage>
      <div className="about-us">
        <p>"Your Money, Your Control."</p>
        <h2>
          Expense-tracker by <br /> <span className="purple">KaranBhangu.</span>
        </h2>
        <h3>
          Welcome to our Expense Tracker Project! You can easily contact me on
          my email id - birk4190@gmail.com if you have any kind of queries or
          want to hire me for your own personal project.
        </h3>
        <br />
        <h3>
          This project is completely developed by me and you can checkout some
          of other projects as well on my github -{" "}
          <a
            href="https://github.com/karanbhangu"
            target="_blank"
            rel="norefferrer"
          >
            KaranBhangu
          </a>
          .
        </h3>
        <br />
        <h3 style={{ marginBottom: "10px" }}>
          Here are my social media handles:
        </h3>
        <h3>
          <ul>
            <li>
              <a href="https://www.instagram.com/karan_bhxngu/" target="_blank">
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/karan-bhangu"
                target="_blank"
              >
                Linkedin
              </a>
            </li>
            <li><a href="https://github.com/karanbhangu" target="_blank">Github</a></li>
          </ul>
        </h3>
      </div>
    </AnimatedPage>
  );
};

export default Contact;
