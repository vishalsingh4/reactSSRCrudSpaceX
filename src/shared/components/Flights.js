import React from "react";

export default function Flights({ launches, location }) {
    const queryParams = new URLSearchParams(location.search);
    return (
        <div className="flight-component">
            {launches && launches.map(({ flight_number, launch_year, mission_name, links: { mission_patch_small }, mission_id }) => (
                <div className="card p-3 mb-3 mr-2 float-left flight-tile" key={flight_number} style={{ width: '18rem', maxWidth: '288px', maxHeight: '504px' }}>
                    <img src={mission_patch_small} className="card-img-top mx-auto rocket-image" alt="Rocket Image" width="250" height="250" style={{background: '#e5e5e5'}} />
                    <div className="card-body pl-0 pr-0 pb-0">
                        <h6 className="card-title mission-name text-primary font-weight-bold">{mission_name}{' '}#{flight_number}</h6>
                        <h6 className="card-title mission-ids font-weight-bold">Mission Ids:</h6>
                        <ul className="text-primary pl-4">
                            {
                                mission_id && mission_id.length > 0 ? mission_id.map((item, index) => (
                                    <li key={index} className="mission-list">{item}</li>
                                )) : (
                                        <span className="text-primary"> - </span>
                                    )
                            }
                        </ul>
                        <h6 className="card-title launch-year font-weight-bold">Launch Year: <span className="text-primary">{launch_year}</span></h6>
                        <h6 className="card-title success-launch font-weight-bold">Successful Launch: <span className="text-primary">{queryParams.get('launch_success') ? queryParams.get('launch_success') : '-'}</span></h6>
                        <h6 className="card-title success-land font-weight-bold">Successful Landing: <span className="text-primary">{queryParams.get('land_success') ? queryParams.get('land_success') : '-'}</span></h6>
                    </div>
                </div>
            ))}
        </div>
    );
}