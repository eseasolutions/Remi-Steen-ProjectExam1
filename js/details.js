//Id
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const launchid = params.get("id");
const container = document.querySelector(".timeline-container");

//API url
const launchUrl = `https://api.spacexdata.com/v4/launches/${launchid}`;

const launchContainer = document.querySelector(".launch-container");

//Function to get data from API
const getData = async () => {
  try {
    const launchRes = await fetch(launchUrl).then((res) => res.json());
    const launchpadUrl = `https://api.spacexdata.com/v4/launchpads/${launchRes.launchpad}`;
    const rocketUrl = `https://api.spacexdata.com/v4/rockets/${launchRes.rocket}`;
    const launchPad = await fetch(launchpadUrl).then((res) => res.json());
    const rocket = await fetch(rocketUrl).then((res) => res.json());
    container.innerHTML = createItem({
      launchInfo: launchRes,
      rocketInfo: rocket,
      padInfo: launchPad,
    });
  } catch (error) {
    launchContainer.innerHTML = createError(error);
  }
};

//Call function to get data from API
getData();

//Reusable function to create Game Item (This reusable function could be separated into its own file)
const createItem = (launch) => {
  return `<div class="timeline-item">
  <h1>${launch.launchInfo.flight_number} - ${launch.launchInfo.name}</h1>
  <p>Date: ${new Date(launch.launchInfo.date_local).toLocaleDateString()}</p>
  <hr>
  <h2>Rocket info</h2>
  <p>Rocket name: ${launch.rocketInfo.name}</p>
  <p>Mass: ${launch.rocketInfo.mass.kg} kg</p>
  <p>Height: ${launch.rocketInfo.height.meters} meters</p>
  <p>Cost/launch: ${launch.rocketInfo.cost_per_launch} USD</p>
  <p>Description:</p>
  <p>${launch.rocketInfo.description}</p>
  <hr>
  <h2>Launchpad info</h2>
  <p>Full name: ${launch.padInfo.full_name}</p>
  <p>Region: ${launch.padInfo.region}</p>
  <p>Timezone: ${launch.padInfo.timezone}</p>
</div>`;
};

//Reusable function to create error message (This reusable function could be separated into its own file)

const createError = (err) => {
  return `<div class="danger">An error occured when calling the API. Error: ${err}</div>`;
};
