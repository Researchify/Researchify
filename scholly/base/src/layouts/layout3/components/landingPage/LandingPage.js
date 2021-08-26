/**
 * This file output landing page (homepage) of client-site.
 */
import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import profilePicture from '../../../../shared/images/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg';

const landingPage = () => {
  return (
    <Fragment>
      <Container fluid className="pages-top-padding">
        <img src={profilePicture} align="left" className="left" />
        <div className="landing-center-title">About Us</div>
        <div className="landing-center-content">
          Lorem ipsum amet dolor sit amet, minim altera mucius an eum. Legere
          antiopam definitiones nam an, qui an electram iracundia, nisl sale
          iisque ad quo. His ut dolore noster. Usu in eleifend platonem
          mandamus, ea meis aeque mei.
        </div>
        <div className="landing-center-content">
          Eos oporteat verterem ut, mea in nulla singulis recteque, ius illum
          nonumes eu. Sale officiis sapientem his at, cu debitis percipit sit.
          Cu eum zril percipit percipitur, eam dolores commune persequeris an.
          Inermis sadipscing ea usu. No harum dicit per, at natum ludus
          voluptaria eos. Elit mundi similique eos ei, eos eros inani ex, in cum
          graeci percipitur.
        </div>
        <div className="landing-center-content">
          Pro commodo convenire ea, mel ex equidem temporibus, mel esse tantas
          adipiscing eu. Posse aperiri est ad, id commodo dignissim cum, everti
          praesent cum an. Ius ne erat choro definitionem, te consequat
          disputando sed, tempor incorrupte constituam ut eos. Vix nisl bonorum
          ne, ludus animal mea te, ius latine deleniti placerat ea. Semper
          inimicus te pri. Ex sed indoctum percipitur, eu persius expetenda
          forensibus mei, porro essent admodum ad qui. Vim labitur officiis
          suscipiantur ea.
        </div>
        <div className="landing-center-content">
          Vis vero nonumy adversarium cu. His petentium evertitur at. Harum
          euismod pri ex, usu te saepe sanctus consectetuer. Fugit consectetuer
          ei vis, te eripuit adolescens scribentur duo. Duo vidit summo at, et
          alterum intellegebat mea, mutat audire usu ei.
        </div>
        <div className="landing-center-content">
          Ad quis civibus lucilius vel. Vix nostrud expetendis dissentiet in, te
          mea oportere incorrupte. Est expetenda principes delicatissimi ne. Ex
          his saepe populo. Blahblah
        </div>
      </Container>
    </Fragment>
  );
};

export default landingPage;
