# SAMVED — Offline Wellbeing Companion

SAMVED is an Android wellbeing prototype designed around the needs of service personnel. It offers a private place to check in, reflect, and find support, including when an internet connection is unavailable.

## The problem it addresses

Service personnel can face stress, isolation, and barriers to seeking support. SAMVED brings a few low-friction wellbeing tools together in one app: daily mood check-ins, private journaling, a supportive offline chat companion, voice input, and counselor resources.

SAMVED is a prototype and is not a diagnostic or emergency service. The companion does not replace a trained counselor or clinician. If someone may be in immediate danger, they should contact local emergency services or a trusted person who can help now.

## Download

After you publish a GitHub Release for this repository, download the Android APK from its **Releases** page.

The release asset is `SAMVED-ultimate-context-UI-debug.apk` (about 150.6 MiB). It includes the language model, voice transcription model, and native inference libraries; no separate model download is needed.

**APK SHA-256:** `B59AE485718C378942F6C011D84A71090CD6EE8C2B6893E9FCF8405AF9622A77`

### Device support

- Android 10 or newer
- 64-bit ARM (`arm64-v8a`)
- Allow around 300 MiB of free storage for installation and the first-use model copy, plus room for local app data.

This is a debug build for demonstration and evaluation, not a Play Store release.

## Main features

- Local demo account and sign-in
- Two-question daily check-in and seven-day mood overview
- Mood suggestions and private journal with entry history
- Offline companion chat with separate conversation history
- On-device Whisper voice transcription; transcripts can be reviewed before sending
- Counselor information and a direct support option
- Light and dark themes

## Technology stack

| Area | Technology |
| --- | --- |
| Android app and interface | Native Android, Java |
| Build | Gradle Kotlin DSL, Android SDK, CMake, Android NDK |
| Local storage | SQLite in app-private storage |
| Text response model | Fine-tuned Ultimate Context GGUF, Q4_K_M quantization (105,454,016 bytes) |
| LLM inference | llama.cpp through a C++ JNI bridge |
| Voice transcription | Whisper tiny multilingual, Q5_1 quantization (32,152,673 bytes) |
| Speech inference | whisper.cpp through a C++ JNI bridge |

## Privacy and safety

The APK has no Android `INTERNET` permission. Chat generation and voice transcription run on the device. The demo sign-in, check-ins, journal entries, and chat history are stored locally in app-private storage. This build does not send conversation text to an admin server and does not deliver admin alerts.

The app includes deterministic checks for some urgent phrases and directs users toward human support. The language model is not relied on by itself to detect emergencies, diagnose, or claim that anyone has been contacted. Model responses can still be incomplete or mistaken.

## Project status

This project package is ready for publication under your GitHub account. See `GITHUB_UPLOAD_GUIDE.md` for steps to create the repository and publish the APK as a release asset. The APK embeds the application, model assets, and third-party notices. The separately developed SAMVED admin desktop app is not part of this repository or APK.
