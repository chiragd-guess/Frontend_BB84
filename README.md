# Quantum Secure Messenger (Frontend_BB84) — Project Status & Backend Integration Guide

## Project Overview

This project is a React-based frontend visualization of a **Quantum Secure Messaging System using the BB84 Quantum Key Distribution protocol**.

The goal is to simulate a secure communication channel between **Alice and Bob**, where:

1. A user starts a conversation from either Alice or Bob.
2. BB84 quantum key exchange runs before the first message transmission.
3. Quantum channel events are visualized:

   * Photon preparation
   * Photon transmission
   * Receiver measurement
   * Basis comparison / sifting
   * QBER estimation
   * Shared key generation
   * Message encryption
   * Ciphertext transmission
4. If the quantum channel is compromised (Eve attack), BB84 aborts the transmission.

The frontend currently contains a complete UI simulation layer using mock data and API placeholders.

---

# Current Frontend Architecture

## Main Components

```
src
│
├── components
│
├── AlicePanel
│   └── AlicePanel.jsx
│
├── BobPanel
│   └── BobPanel.jsx
│
├── QuantumChannelPanel
│   └── QuantumChannelPanel.jsx
│
├── ProgressTimeline
│   └── ProgressTimeline.jsx
│
├── MessageComposer
│   └── MessageComposer.jsx
│
├── ChatWindow
│   └── ChatWindow.jsx
│
├── QuickControls
│   └── QuickControls.jsx
│
├── KeyExchangeVisualizer
│
├── AnalyticsChart
│
├── SessionSummary
│
├── data
│   └── mockData.js
│
└── services
    └── api.js
```

---

# Current Features Implemented

## 1. Two-way Communication

Both Alice and Bob can initiate conversations.

Example:

### Alice starts

```
Alice writes message
        ↓
BB84 runs
        ↓
Key generated
        ↓
Message encrypted
        ↓
Bob receives
```

### Bob starts

```
Bob writes message
        ↓
BB84 runs
        ↓
Key generated
        ↓
Message encrypted
        ↓
Alice receives
```

The first sender triggers the quantum key exchange.

After key establishment:

* Alice ↔ Bob messages are instant
* BB84 does not rerun for every message

---

# BB84 Simulation Flow

The quantum channel has 8 stages:

```
1. Preparing Photons
2. Sending Photons
3. Receiver Measuring
4. Basis Comparison / Sifting
5. QBER Estimation
6. Shared Key Generation
7. Message Encryption
8. Ciphertext Transmission
```

Each stage updates dynamically in:

```
ProgressTimeline.jsx
```

---

# QBER Behaviour

## Eve OFF (Normal Secure Channel)

Current frontend simulation:

```javascript
qber = random value between 1% and 4%
```

Example outputs:

```
1.42%
2.23%
3.49%
```

Meaning:

* Small errors due to channel noise
* Secure key generation allowed

Flow:

```
Preparing Photons        ✓
Sending Photons          ✓
Measurement              ✓
Sifting                  ✓
QBER Estimation          ✓

QBER ≈ 1-4%

Shared Key Generation    ✓
Encryption               ✓
Transmission             ✓
Message Delivered        ✓
```

---

## Eve ON (Intercept-Resend Attack)

Current simulation:

```javascript
qber = 25%
```

Reason:

BB84 intercept-resend produces approximately:

```
50% chance Eve chooses wrong basis

50% chance wrong basis creates error

0.5 × 0.5 = 0.25

25% QBER
```

Flow:

```
Preparing Photons        ✓
Sending Photons          ✓
Measurement              ✓
Sifting                  ✓
QBER Estimation          ✕

QBER = 25%

Shared Key Generation    ✕
Encryption               ✕
Transmission             ✕
Message Blocked
```

---

# QBER Threshold Logic

Implemented:

```javascript
ABORT_THRESHOLD = 11
```

Rules:

| QBER  | Action                    |
| ----- | ------------------------- |
| 0-2%  | Excellent secure channel  |
| 2-5%  | Acceptable                |
| 5-11% | Error correction possible |
| >11%  | Abort communication       |
| ~25%  | Strong Eve detection      |

---

# Eve Detection Behaviour

When:

```
QBER > 11%
```

The frontend:

1. Changes session status:

```javascript
status:"aborted"
```

2. Rejects message transmission.

3. Discards key:

```javascript
keyLength:0
```

4. Adds warning message:

```
⚠ BB84 Protocol Aborted

High QBER detected.

Possible eavesdropping detected.

Shared key discarded.

Message was NOT transmitted.
```

5. Locks message composer.

User must:

```
Disable Eve
↓
Retry communication
```

---

# Technical Details Section

Implemented inside:

```
BobPanel.jsx
```

Shows:

```
Last Encrypted

110010101011001010101001


Last Message

Hello Bob
```

Currently encryption value is mock data.

After backend integration this should come from:

Backend BB84 encryption result.

---

# Current Mock Data

Currently:

```javascript
encryptedMessage:
"110010101011001010101001"
```

QBER:

```javascript
Eve OFF:
1-4%

Eve ON:
25%
```

Photon count:

```
512 photons
```

Key length:

```
256 bits
```

Session:

```
QKD-XXXX
```

---

# Backend Integration Required

Backend should provide real BB84 simulation results.

Frontend already has:

```
src/services/api.js
```

Current endpoint:

```javascript
POST /simulate
```

Expected request:

```json
{
 "message":"Hello Bob",
 "noise_level":0,
 "eve_enabled":false
}
```

---

Backend Response Should Be:

```json
{
 "encrypted_message":"101010101010",

 "decrypted_message":"Hello Bob",

 "qber":2.31,

 "photons_sent":512,

 "key_length":256,

 "session_id":"QKD-001",

 "duration":"1.34s",

 "secure":true
}
```

---

# After Backend Completion

Replace:

```
mockSimulation()
```

with:

```
real backend response
```

Main files to modify:

## MessageComposer.jsx

Remove:

```javascript
runMockSimulation()
```

Use:

```javascript
const result = await runSimulation()
```

Already partially implemented.

---

## BobPanel.jsx

Replace:

```javascript
encryptedMessage:
"110010101011001010101001"
```

with:

```javascript
result.encrypted_message
```

Replace:

```javascript
qber:25
```

with:

```javascript
result.qber
```

---

## api.js

Update endpoint if backend changes.

Currently:

```javascript
POST localhost:8000/simulate
```

---

# Remaining Frontend Work After Backend

## 1. Real-time animation

Currently:

```
stage changes every 600ms
```

Future:

Backend should stream:

```
Photon preparation started
Photon sending started
Measurement completed
```

using:

* WebSocket
* Server Sent Events

---

## 2. Better Quantum Visualization

Replace placeholders:

Current:

```
[Alice Icon]

-- Photon Stream Placeholder --

[Bob Icon]
```

Future:

Animated:

```
Alice
 |
 |
Photon pulses
 |
 |
Bob
```

Include:

* photon states
* basis selection
* sifted key bits

---

## 3. Better Encryption Visualization

Show:

```
Original Message

Hello Bob


↓

Encryption Key

10101010101


↓

Ciphertext

110101010
```

---

## 4. Real Analytics

Replace:

```
Chart Placeholder
```

with:

* photons sent vs received
* QBER graph
* key generation rate
* noise impact

---

## 5. UI Design Phase

Current UI is functional but basic.

Final design improvements:

* Dark quantum theme
* Better cards
* Animated photon stream
* Quantum circuit visuals
* Better icons
* Responsive mobile layout
* Loading animations
* Better status indicators

---

# Important Instruction For Future AI

If more implementation details are required, ask for terminal commands:

Example:

```
cat src/components/FileName/FileName.jsx
```

to inspect the exact current code before making changes.

Do not rewrite the whole architecture.

Only modify the required files while preserving:

* existing BB84 flow
* two-way communication
* Eve detection logic
* technical details section
* backend API structure

---

**Current Status:**

Frontend BB84 visualization: ✅ Complete
Two-way messaging: ✅ Complete
Eve detection logic: ✅ Complete
Abort mechanism: ✅ Complete
Technical details: ✅ Complete
Backend connection: ⏳ Waiting
Final UI polish: ⏳ Remaining
Other pages except Dashboard like Analytics, About: ⏳ Remaining




# 👥 Division of Work

### 🖥️ Dashboard (Chirag)

- `pages/Dashboard/Dashboard.jsx`
- `AlicePanel`
- `BobPanel`
- `QuantumChannelPanel`
- `MessageComposer`
- `ChatWindow`
- `ProgressTimeline`
- `KeyExchangeVisualizer`
- `TopBar`
- `QuickControls`
- `StatusCard`
- `SessionSummary`
- `AnalyticsChart`

### 📊 Analytics & ℹ️ About (Drone)

- `pages/Analytics/Analytics.jsx`
- `pages/About/About.jsx`
- `Final UI Design, logos, and overall interferenec`


### 🤝 Shared Files

- `Navbar.jsx`
- `AppRouter.jsx`
- `globals.css`
- `variables.css`