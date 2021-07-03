import React from 'react';
import { Link } from 'react-router-dom';

const SectorBlock = (props) => (
  <Link to={`/${props.sector.name_en}/${props.sector.sector_id}`}>
    <div className="sectorBlock-body d-inline-block m-3 p-3">
      <img src={props.sector.logo_url} />
      {props.sector.sector_name}
    </div>
  </Link>
);

export default SectorBlock;