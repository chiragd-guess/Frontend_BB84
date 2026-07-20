"""
===========================================
Simple test for the BB84 Simulation Engine
===========================================
"""

import config

from simulator import BB84Simulator


simulator = BB84Simulator()

results = simulator.run(

    number_of_photons=100,

    channel_noise=0.05,

    photon_loss=0.10,

    detector_efficiency=0.90,

    dark_count_rate=0.01,

    eve_interception=0.25

)

print("\n" + "=" * 80)
print("🔐 BB84 QUANTUM SECURE MESSENGER")
print("=" * 80)

# ==========================================================
# SESSION
# ==========================================================

print("\n📌 SESSION")
print("-" * 80)

print(f"Session ID          : {results['session']['session_id']}")
print(f"Protocol            : {results['session']['protocol']}")
print(f"Status              : {results['session']['status']}")
print(f"Start Time          : {results['session']['start_time']}")
print(f"Duration            : {results['session']['duration']} sec")

# ==========================================================
# CONTROLS
# ==========================================================

print("\n⚙️ SIMULATION SETTINGS")
print("-" * 80)

controls = results["controls"]

print(f"Photons             : {controls['number_of_photons']}")
print(f"Noise               : {controls['channel_noise']*100:.1f}%")
print(f"Photon Loss         : {controls['photon_loss']*100:.1f}%")
print(f"Detector Efficiency : {controls['detector_efficiency']*100:.1f}%")
print(f"Dark Count Rate     : {controls['dark_count_rate']*100:.1f}%")
print(f"Eve Interception    : {controls['eve_interception']*100:.1f}%")

# ==========================================================
# STATISTICS
# ==========================================================

print("\n📊 STATISTICS")
print("-" * 80)

stats = results["statistics"]

print(f"Photons Sent        : {stats['photons_sent']}")
print(f"Photons Received    : {stats['photons_received']}")
print(f"Photons Lost        : {stats['photons_lost']}")
print(f"Noise Events        : {stats['noise_events']}")
print(f"Eve Intercepted     : {stats['eve_intercepted']}")
print(f"Detected Photons    : {stats['detected_photons']}")
print(f"Detector Missed     : {stats['detector_missed']}")
print(f"Dark Counts         : {stats['dark_counts']}")
print(f"Matching Bases      : {stats['matching_bases']}")
print(f"Discarded Bits      : {stats['discarded_bits']}")
print(f"Errors              : {stats['errors']}")
print(f"Corrected Errors    : {stats['errors_corrected']}")
print(f"QBER                : {stats['qber']:.2f}%")
print(f"Final Key Length    : {stats['final_key_length']} bits")

# ==========================================================
# SECURITY
# ==========================================================

print("\n🛡 SECURITY")
print("-" * 80)

security = results["security"]

print(f"Secure              : {security['secure']}")
print(f"Eve Detected        : {security['eve_detected']}")
print(f"QBER                : {security['qber']:.2f}%")
print(f"Threshold           : {security['threshold']:.2f}%")

# ==========================================================
# TIMELINE
# ==========================================================

print("\n⏳ TIMELINE")
print("-" * 80)

for stage in results["analytics"]["timeline"]:
    print(f"✓ {stage['stage']}")

# ==========================================================
# PERFORMANCE
# ==========================================================

print("\n⚡ PERFORMANCE")
print("-" * 80)

perf = results["performance"]

print(f"Execution Time      : {perf['execution_time']} sec")
print(f"Photons / Second    : {perf['photons_per_second']}")

# ==========================================================
# KEY SUMMARY
# ==========================================================

print("\n🔑 KEY SUMMARY")
print("-" * 80)

keys = results["keys"]

print(f"Alice Key           : {keys['alice_key']}")
print(f"Bob Key             : {keys['bob_key']}")
print(f"Corrected Key       : {keys['corrected_key']}")
print(f"Final Key           : {keys['final_key']}")

# ==========================================================
# PHOTON HISTORY
# ==========================================================

print("\n📡 PHOTON HISTORY")
print("-" * 80)

for photon in results["analytics"]["photon_history"]:

    print(
        f"#{photon['id']:03} | "
        f"{photon['initial_state']} → {photon['current_state']} | "
        f"Lost:{photon['lost']} | "
        f"Noise:{photon['noisy']} | "
        f"Eve:{photon['intercepted']} | "
        f"Bob:{photon['bob_bit']} | "
        f"Kept:{photon['kept_after_sifting']}"
    )