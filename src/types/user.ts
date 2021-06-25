export default interface User {
  id: number;
  avatar_url: string;
  url: string;
  first_name: string;
  last_name: string;
  repos: {
    public: number;
    private: number;
  };
}
