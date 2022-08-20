/* 1º Route and it's highlights : */
/* Start/End of Route */
INSERT INTO location(id,latitude, longitude) VALUES(1, 38.676157, -9.322966); /* Praia da Torre */
INSERT INTO location(id,latitude, longitude) VALUES(2, 38.734831, -9.472311); /* Praia do Guincho */
INSERT INTO route(id, start_location_id, end_location_id, description) VALUES(1, 1, 2, 'Best beaches in Cascais');
/* Highlights */
/* This 2 highlights don't need a new location row insertion since for the route creation they were already created */
INSERT INTO highlight(id, location_id, name, description, rating) VALUES(1, 1, 'Praia da Torre', 'Very cool tower!', 4.4);
INSERT INTO highlight(id, location_id, name, description, rating) VALUES(2, 2, 'Praia do Guincho', 'A little windy but still good!', 3.8);
INSERT INTO location(id,latitude, longitude) VALUES(3, 38.680369, -9.336397); /* Praia de Carcavelos */
INSERT INTO highlight(id, location_id, name, description, rating) VALUES(3, 3, 'Praia de Carcavelos', 'Very nice to catch some sun!', 4.0);
INSERT INTO route_highlights(route_id, highlight_id) VALUES(1, 1);
INSERT INTO route_highlights(route_id, highlight_id) VALUES(1, 2);
INSERT INTO route_highlights(route_id, highlight_id) VALUES(1, 3);

/* 2º Route and it's highlights : */
/* Start/End of Route */
INSERT INTO location(id,latitude, longitude) VALUES(4, 38.475354, -8.878655); /* Tróia */
INSERT INTO location(id,latitude, longitude) VALUES(5, 37.018022, -8.942877); /* Sagres */
INSERT INTO route(id, start_location_id, end_location_id, description) VALUES(2, 4, 5, 'Best beaches in Setúbal/Alentejo');
/* Highlights */
INSERT INTO location(id,latitude, longitude) VALUES(6, 38.382459, -8.785380); /* Comporta */
INSERT INTO highlight(id, location_id, name, description, rating) VALUES(4, 6, 'Comporta', 'Very nice beach!', 4.1);
INSERT INTO route_highlights(route_id, highlight_id) VALUES(2, 4);

/* 3º Route and it's highlights : */
/* Start/End of Route */
INSERT INTO location(id,latitude, longitude) VALUES(7, 38.692612, -9.215869); /* Torre de Belém */
INSERT INTO location(id,latitude, longitude) VALUES(8, 38.763898, -9.093754); /* Oceanário */
INSERT INTO route(id, start_location_id, end_location_id, description) VALUES(3, 7, 8, 'Culture route in Lisbon');
/* Highlights */
INSERT INTO highlight(id, location_id, name, description, rating) VALUES(5, 7, 'Torre de Belém', 'Very near the best pastéis de nata!', 4.2);
INSERT INTO highlight(id, location_id, name, description, rating) VALUES(6, 8, 'Oceanário', 'Nice oceanarium!', 4.2);
INSERT INTO location(id,latitude, longitude) VALUES(9, 38.708777, -9.136521); /* Arco da Rua Augusta */
INSERT INTO highlight(id, location_id, name, description, rating) VALUES(7, 9, 'Arco da Rua Augusta', 'Very cool!', 4.2);
INSERT INTO route_highlights(route_id, highlight_id) VALUES(3, 5);
INSERT INTO route_highlights(route_id, highlight_id) VALUES(3, 6);
INSERT INTO route_highlights(route_id, highlight_id) VALUES(3, 7);

     