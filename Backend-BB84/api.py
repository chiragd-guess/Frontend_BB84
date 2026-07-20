from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import traceback
from simulator import BB84Simulator
from encryption import xor_encrypt, xor_decrypt

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class SimRequest(BaseModel):
    noise: float = 0.05
    eve: bool = False
    num_photons: int = 1000
    message: str | None = None
    key: str | None = None

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/simulate")
def simulate(req: SimRequest):
    try:
        sim = BB84Simulator()
        result = sim.run(
        number_of_photons=req.num_photons,
        channel_noise=req.noise,
        photon_loss=0.10,
        detector_efficiency=0.90,
        dark_count_rate=0.01,
        eve_interception=1.0 if req.eve else 0.0,
        message=req.message
    )
        result["backend_check"] = "REAL_BB84_PYTHON_ENGINE"

        return result
        
    except Exception:
        raise HTTPException(status_code=500, detail=traceback.format_exc())

class EncryptRequest(BaseModel):
    message:str
    key:str


@app.post("/encrypt")
def encrypt(req: EncryptRequest):

    ciphertext = xor_encrypt(
        req.message,
        req.key
    )

    decrypted = xor_decrypt(
        ciphertext,
        req.key
    )


    return {
        "ciphertext":ciphertext,
        "decrypted":decrypted
    }