import React, { Fragment } from 'react';
import { Container, Carousel, Image } from 'react-bootstrap';
import TestImg from '../../images/test-image-large.jpg';
import './landingPage.css';

const landingPage = () => {
  return (
    <Fragment>
      <Carousel>
        <Carousel.Item interval={8000}>
          <Image src={TestImg} fluid className="carousel-img" />
        </Carousel.Item>
        <Carousel.Item interval={8000}>
          <Image src={TestImg} fluid className="carousel-img" />
        </Carousel.Item>
        <Carousel.Item interval={8000}>
          <Image src={TestImg} fluid className="carousel-img" />
        </Carousel.Item>
      </Carousel>
      <Container fluid>
        <div className="center-title">About Us</div>
        <div className="center-content">
          This section of text to be replaced of user input, but for current
          commit, to not editing too many file in one commit, features of
          getting user input in Researchify site will be implemented in next commit.
        </div>
        <div className="center-content">
          Lorem ipsum dolor sit amet, minim altera mucius an eum. Legere
          antiopam definitiones nam an, qui an electram iracundia, nisl sale
          iisque ad quo. His ut dolore noster. Usu in eleifend platonem
          mandamus, ea meis aeque mei.
        </div>
        <div className="center-content">
          Eos oporteat verterem ut, mea in nulla singulis recteque, ius illum
          nonumes eu. Sale officiis sapientem his at, cu debitis percipit sit.
          Cu eum zril percipit percipitur, eam dolores commune persequeris an.
          Inermis sadipscing ea usu. No harum dicit per, at natum ludus
          voluptaria eos. Elit mundi similique eos ei, eos eros inani ex, in cum
          graeci percipitur.
        </div>
        <div className="center-content">
          Pro commodo convenire ea, mel ex equidem temporibus, mel esse tantas
          adipiscing eu. Posse aperiri est ad, id commodo dignissim cum, everti
          praesent cum an. Ius ne erat choro definitionem, te consequat
          disputando sed, tempor incorrupte constituam ut eos. Vix nisl bonorum
          ne, ludus animal mea te, ius latine deleniti placerat ea. Semper
          inimicus te pri. Ex sed indoctum percipitur, eu persius expetenda
          forensibus mei, porro essent admodum ad qui. Vim labitur officiis
          suscipiantur ea.
        </div>
        <div className="center-content">
          Vis vero nonumy adversarium cu. His petentium evertitur at. Harum
          euismod pri ex, usu te saepe sanctus consectetuer. Fugit consectetuer
          ei vis, te eripuit adolescens scribentur duo. Duo vidit summo at, et
          alterum intellegebat mea, mutat audire usu ei.
        </div>
        <div className="center-content">
          Ad quis civibus lucilius vel. Vix nostrud expetendis dissentiet in, te
          mea oportere incorrupte. Est expetenda principes delicatissimi ne. Ex
          his saepe populo.
        </div>
      </Container>
    </Fragment>
  );
};

export default landingPage;
