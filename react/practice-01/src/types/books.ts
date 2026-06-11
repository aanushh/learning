export interface BooksResponse {
  status: string;
  "message-type": string;
  "message-version": string;
  message: BookResultMessage;
}

export interface BookResultMessage {
  "total-results": number;
  items: BookItems[];
  "items-per-page": number;
  query: {
    "start-index": number;
    "search-terms": string | null;
  };
}

export interface BookItems {
  "publisher-location": string;
  publisher: string;
  created: { "date-time": "2016-05-19T03:13:08Z"; timestamp: 1463627588000 };
  page: "1-31";
  title: string[];
  prefix: string;
  author: Author[];
  "container-title": string[];
  language: "en";
  issued: { "date-parts": number[] };
  URL: string;
}

export interface Author {
  given: string;
  family: string;
  sequence: string;
}
