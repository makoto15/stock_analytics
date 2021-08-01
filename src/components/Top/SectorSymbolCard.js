import React from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

const SectorSymbolCard = (props) => (
      <Link to={`/symbol/${props.symbol.symbol}`}>
        <ListGroup.Item>
          <img src={props.symbol.logo_url} />
          {props.symbol.en_name}
        </ListGroup.Item>
      </Link>
);

export default SectorSymbolCard;