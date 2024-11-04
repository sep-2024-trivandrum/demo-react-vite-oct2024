import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function CohortMapHttp() {
  const baseUrl = "http://localhost:3000/cohorts";
  const baseUrl2 = "http://localhost:3000/venues";
  let [allCohorts, setAllCohorts] = useState([]);
  let [allVenues, setAllVenues] = useState([]);
  let [selectedVenueId, setSelectedVenueId] = useState(0);
  let [fetchedCohort, setFetchedCohort] = useState({
    id: 0,
    cohortSize: 0,
    cohortVenueId: 0,
    cohortStack: "",
    cohortStartDate: "",
    cohortDurationWeeks: 0,
    cohortSPOC: "",
    cohortInstructor: "",
  });
  let { cid } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    fetch(baseUrl + "/" + cid)
      .then((res) => res.json())
      .then((data) => setFetchedCohort(data));
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => setAllCohorts(data));
    fetch(baseUrl2)
      .then((res) => res.json())
      .then((data) => setAllVenues(data));
  }, []);

  function handleMapping() {
    fetchedCohort.cohortVenueId = +selectedVenueId;
    fetch(baseUrl + "/" + cid, {
      method: "PUT",
      body: JSON.stringify(fetchedCohort),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => navigate("/training-http/cohort-list-http"));
  }

  function addDays(date, days) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  }

  let ignoreVenueIds = [];
  allCohorts.forEach((eachCohort) => {
    if (eachCohort.cohortVenueId != 0) {
      if (
        (new Date(fetchedCohort.cohortStartDate) >=
          new Date(eachCohort.cohortStartDate) &&
          new Date(fetchedCohort.cohortStartDate) <=
            addDays(
              new Date(eachCohort.cohortStartDate),
              eachCohort.cohortDurationWeeks * 7
            )) ||
        (addDays(
          new Date(fetchedCohort.cohortStartDate),
          fetchedCohort.cohortDurationWeeks * 7
        ) >= new Date(eachCohort.cohortStartDate) &&
          addDays(
            new Date(fetchedCohort.cohortStartDate),
            fetchedCohort.cohortDurationWeeks * 7
          ) <=
            addDays(
              new Date(eachCohort.cohortStartDate),
              eachCohort.cohortDurationWeeks * 7
            ) &&
          eachCohort.cohortVenueId)
      ) {
        ignoreVenueIds.push(eachCohort.cohortVenueId);
      }
    }
  });

  let mappedAllVenues = allVenues.map((eachVenue) => {
    if (
      eachVenue.venueSeater >= fetchedCohort.cohortSize &&
      !ignoreVenueIds.includes(eachVenue.id)
    ) {
      return (
        <option key={eachVenue.id} value={eachVenue.id}>
          {eachVenue.id} - {eachVenue.venueName} ({eachVenue.venueSeater}) -
          {eachVenue.venueCity}, {eachVenue.venueState}
        </option>
      );
    }
  });
  return (
    <>
      <div className="container mx-5 px-5">
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          {/* <button onClick={() => navigate("/training/cohort-list")} className="btn btn-primary"> */}
          Back to Cohort List
        </button>
        {fetchedCohort.cohortStack == "" ? (
          ""
        ) : (
          <div className="card m-2">
            <div className="card-header bg-warning text-light">
              <h3>Venue Mapping for Cohort ID : {cid}</h3>
            </div>
            <div className="card-body">
              <h6>Cohort Stack : {fetchedCohort.cohortStack}</h6>
              <h6>Cohort Size : {fetchedCohort.cohortSize}</h6>
              <h6>Cohort Duration : {fetchedCohort.cohortDurationWeeks}</h6>
              <h6>
                Cohort Start Date :
                {new Date(fetchedCohort.cohortStartDate).toDateString()}
              </h6>
              <h6>
                <div className="form-control-group">
                  <label htmlFor="cVenue" className="form-label">
                    Venue Selection:
                  </label>
                  <select
                    className="form-control"
                    id="cVenue"
                    onChange={(e) => {
                      setSelectedVenueId(e.target.value);
                      console.log(e.target.value);
                    }}
                  >
                    {mappedAllVenues}
                  </select>
                </div>
              </h6>
              <div>
                <button onClick={handleMapping} className="btn btn-warning">
                  Update Venue Mapping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
