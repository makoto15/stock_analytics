import React from 'react';

const SectorBlock = (props) => (
  <div className="sectorBlock-body d-inline-block m-3 p-3">
    <img src={props.sector.logo_url} />
    {props.sector.sector_name}
  </div>
);

export default SectorBlock;