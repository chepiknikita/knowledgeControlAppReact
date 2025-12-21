class UrlService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_NEST_SERVER_API_URL || 'http://localhost:3000';
  }

  getServerUrl(): string {
    return this.baseUrl;
  }

  getImageUrl(imagePath?: string): string {
    return imagePath ? `${this.baseUrl}/${imagePath}` : '';
  }
}

export default new UrlService();