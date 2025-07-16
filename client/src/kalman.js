// Simple 1D Kalman filter
class KalmanFilter {
  constructor({ R = 1, Q = 1, A = 1, B = 1, C = 1 }) {
    this.R = R; // Process noise
    this.Q = Q; // Measurement noise
    this.A = A; // State transition
    this.B = B; // Control matrix
    this.C = C; // Measurement matrix

    this.cov = NaN;
    this.x = NaN; // Filtered value
  }

  filter(z, u = 0) {
    if (isNaN(this.x)) {
      this.x = (1 / this.C) * z;
      this.cov = (1 / this.C) * this.Q * (1 / this.C);
    } else {
      // Prediction
      const predX = this.A * this.x + this.B * u;
      const predCov = this.A * this.cov * this.A + this.R;

      // Correction
      const K = predCov * this.C * (1 / (this.C * predCov * this.C + this.Q));
      this.x = predX + K * (z - this.C * predX);
      this.cov = predCov - K * this.C * predCov;
    }

    return this.x;
  }
}

export default KalmanFilter;
