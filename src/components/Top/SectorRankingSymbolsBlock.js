import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import SectorSymbolCard from './SectorSymbolCard';


const SectorRankingSymbolsBlock = (props) => (
      <Card style={{ width: '18rem' }}>
        <Card.Header>{props.sector.sector_name}</Card.Header>
        <ListGroup variant="flush">
          {
            props.sector.symbols.map((symbol) => <SectorSymbolCard symbol={symbol} key={symbol.symbol} />)
          }
          <Link to={`/${props.sector.name_en}/${props.sector.sector_id}`}>
            <ListGroup.Item>{props.sector.sector_name}銘柄一覧へ</ListGroup.Item>
          </Link>
        </ListGroup>
      </Card>
);

export default SectorRankingSymbolsBlock;