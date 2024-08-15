// Rajapintaluokka

export interface Credential {
  id: number; // sisäänkirjautuessa id:tä ei syötetä formDataan
  username: string;
  password: string;
}
