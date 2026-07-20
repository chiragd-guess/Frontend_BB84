from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from simulator import BB84Simulator


app = FastAPI(
    title="BB84 Quantum Secure Messenger API"
)


# React connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():

    return {
        "status": "online",
        "message": "BB84 backend running"
    }



@app.post("/simulate")
def simulate(
    number_of_photons: int = 1000,
    channel_noise: float = 0.05,
    photon_loss: float = 0.10,
    detector_efficiency: float = 0.90,
    dark_count_rate: float = 0.01,
    eve_interception: float = 0.0
):

    simulator = BB84Simulator()


    results = simulator.run(

        number_of_photons=number_of_photons,

        channel_noise=channel_noise,

        photon_loss=photon_loss,

        detector_efficiency=detector_efficiency,

        dark_count_rate=dark_count_rate,

        eve_interception=eve_interception

    )


