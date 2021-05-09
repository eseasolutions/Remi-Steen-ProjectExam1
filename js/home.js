const upcomingLaunchesApi = "https://api.spacexdata.com/v4/launches/upcoming";
const timelineContainer = document.querySelector(".timeline-container");

const getUpcomingLaunches = async () => {
  try {
    const res = await fetch(upcomingLaunchesApi);
    const data = await res.json();
    data.sort((a, b) => {
      let dateA = new Date(a.date_local);
      let dateB = new Date(b.date_local);
      return dateA - dateB;
    });
    console.log(data);
    timelineContainer.innerHTML = "";

    for (let i = 0; i < 5; i++) {
      timelineContainer.innerHTML += createItem(data[i]);
    }
  } catch (err) {
    timelineContainer.innerHTML = createError(err);
  }
};

getUpcomingLaunches();

//Function to create LaunchItem
const createItem = (launchInfo) => {
  return ` 
    <a href="./details.html?id=${
      launchInfo.id
    }"><div class="timeline-item highlite">
     <h3>${launchInfo.name}</h3>
     <p>Date: ${new Date(launchInfo.date_local).toLocaleDateString()}</p>
     <p>Flight number: ${launchInfo.flight_number}</p>
    </div>`;
};

const createError = (err) => {
  return `<div class="danger">An error occured when calling the API. Error: ${err}</div>`;
};
