import React, { Fragment } from 'react';
import { Container, Carousel, Image } from 'react-bootstrap';
import TestImg from '../../images/test-image-large.jpg';

const landingPage = () => {
  return (
    <Fragment>
      <Carousel className="landing-top-padding">
        <Carousel.Item interval={8000}>
          <Image src={TestImg} fluid className="landing-carousel-img" />
        </Carousel.Item>
        <Carousel.Item interval={8000}>
          <Image src={TestImg} fluid className="landing-carousel-img" />
        </Carousel.Item>
        <Carousel.Item interval={8000}>
          <Image src={TestImg} fluid className="landing-carousel-img" />
        </Carousel.Item>
      </Carousel>
      <Container fluid>
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
          his saepe populo.
        </div>
        <div className="landing-center-title">Vision</div>
        <div className="landing-center-content">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt.
        </div>
        <div className="landing-center-title">Mission</div>
        <div className="landing-center-content">
          Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit, sed quia non numquam eius modi tempora
          incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut
          enim ad minima veniam, quis nostrum exercitationem ullam corporis
          suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
          autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
          nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
          voluptas nulla pariatur?
        </div>
      </Container>
    </Fragment>
  );
};

export default landingPage;
