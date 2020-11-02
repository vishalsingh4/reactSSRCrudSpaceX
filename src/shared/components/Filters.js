import React from "react";

export default function Filters({ history, location, launchFilters }) {

    const getQueryParams = ({ item: { value }, filterTitle }) => {
        let queryParams = new URLSearchParams(location.search);
        if (!queryParams.has('limit'))
            queryParams.append('limit', 100)
        switch (filterTitle) {
            case 'Launch Year':
                if (!queryParams.has('launch_year'))
                    queryParams.append('launch_year', value);
                else
                    queryParams && queryParams.get('launch_year') !== value && queryParams.set('launch_year', value)
                break;
            case 'Successful Launch':
                if (!queryParams.has('launch_success'))
                    queryParams.append('launch_success', value.toLowerCase());
                else
                    queryParams && queryParams.get('launch_success') !== value.toLowerCase() && queryParams.set('launch_success', value.toLowerCase())
                break;
            case 'Successful Landing':
                if (!queryParams.has('land_success'))
                    queryParams.append('land_success', value.toLowerCase());
                else
                    queryParams && queryParams.get('land_success') !== value.toLowerCase() && queryParams.set('land_success', value.toLowerCase())
                break;
            default:
                queryParams = '';
        }
        return queryParams.toString();
    };

    const handleFilterClick = (args) => {
        history.push({
            pathname: '/launch',
            search: getQueryParams(args),
        });
    };

    return (
        <div className="filter-component">
            <div className="card card-tile">
                <div className="card-body">
                    <h5 className="card-title">Filters</h5>
                    {[...launchFilters].map((value, index) => {
                        const filterTitle = value[0];
                        const filterButtons = value[1];
                        return (
                            <div key={index}>
                                <h6 className="card-subtitle mb-2 text-muted text-center mt-1">{filterTitle}</h6>
                                <hr />
                                {filterButtons.map((item, btnIndex) => (<button
                                    type="button"
                                    className={`btn m-1 pr-3 pl-3 mr-2 mb-2 filter-button ${item.selected ? 'btn-info' : 'btn-success'}`}
                                    key={btnIndex}
                                    onClick={() => handleFilterClick({ item, filterTitle })}
                                >
                                    {item.value}
                                </button>))}
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    );
}