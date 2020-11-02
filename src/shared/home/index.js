import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLaunches } from "../reducers";
import Filters from "../components/Filters";
import Flights from "../components/Flights";
import Loader from "../components/Loader";

import { yearMap } from '../constants'

import "./index.css";

class Home extends Component {

  state = {
    launchFilters: yearMap,
  };

  static initialAction(searchQuery) {
    return fetchLaunches(searchQuery);
  }

  componentDidMount() {
    if(!this.props.launches) {
      this.props.dispatch(Home.initialAction(this.props.location.search));
    }
    this.checkAndUpdateSelectedValue();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.props.dispatch(Home.initialAction(this.props.location.search));
      this.checkAndUpdateSelectedValue();
    }
  }

  checkAndUpdateSelectedValue = () => {
    const { location } = this.props;
    let queryParams = new URLSearchParams(location.search);
    const {
      launchFilters
    } = this.state;
    if (
      queryParams.has('launch_year') ||
      queryParams.has('launch_success') ||
      queryParams.has('land_success')
    ) {

      [...launchFilters.values()].map(values => {
        values.map(item => {
          if (
            (queryParams.has('launch_year') && queryParams.get('launch_year') === item.value && item.key === 'launch_year') ||
            (
              queryParams.has('launch_success') &&
              (
                (queryParams.get('launch_success') === 'true' && item.key === 'launch_success_true') ||
                (queryParams.get('launch_success') === 'false' && item.key === 'launch_success_false')
              )
            ) ||
            (
              queryParams.has('land_success') &&
              (
                (queryParams.get('land_success') === 'true' && item.key === 'land_success_true') ||
                (queryParams.get('land_success') === 'false' && item.key === 'land_success_false')
              )
            )
          ) {
            item.selected = true;
          } else {
            item.selected = false;
          }
        });
      });
      this.setState({
        launchFilters
      });
    }
  };

  render() {
    const {
      history,
      location,
      launches,
      loading,
    } = this.props;

    const {
      launchFilters
    } = this.state;

    if(loading) {
      return <Loader />;
    }

    return (
      <div className="home-component p-4">
        <h2 className="font-weight-bolder mt-2 mb-2 page-header">
          SpaceX Launch Programs
        </h2>
        <div className="container-fluid p-0">
          <div className="row page-container">
            <div className="col-12 filter-container">
              <Filters history={history} location={location} launchFilters={launchFilters} />
            </div>
            <div className="col-12 p-0 flight-container">
              <Flights launches={launches} location={location} />
            </div>
          </div>
        </div>
        <div className="text-center mt-4 mb-2">
        <h6 className="card-title font-weight-bold">Developed by: <span className="text-primary">Vishal Singh</span></h6>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  launches: state.launches,
  loading: state.loading,
});

export default connect(mapStateToProps)(Home);

// export default Home;
