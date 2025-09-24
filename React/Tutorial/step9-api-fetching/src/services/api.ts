// API 서비스 클래스들

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { User, Post, Comment, Todo, ApiResponse, ApiError } from '../types/api';

// JSONPlaceholder API 기본 URL
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// Axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  config => {
    // console.log(`🚀 API 요청: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  error => {
    // console.error('❌ 요청 에러:', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log(`✅ API 응답: ${response.status} ${response.config.url}`);
    return response;
  },
  error => {
    // console.error('❌ 응답 에러:', error);
    const apiError: ApiError = {
      message: error.message || '알 수 없는 오류가 발생했습니다.',
      status: error.response?.status,
      code: error.code,
    };
    return Promise.reject(apiError);
  }
);

// 기본 Fetch API 서비스
export class FetchApiService {
  private baseUrl: string;

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        data,
        status: response.status,
        statusText: response.statusText,
      };
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : '알 수 없는 오류',
        status: (error as any)?.status,
      };
      throw apiError;
    }
  }

  // 사용자 관련 API
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>('/users');
  }

  async getUser(id: number): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}`);
  }

  // 게시글 관련 API
  async getPosts(): Promise<ApiResponse<Post[]>> {
    return this.request<Post[]>('/posts');
  }

  async getPost(id: number): Promise<ApiResponse<Post>> {
    return this.request<Post>(`/posts/${id}`);
  }

  async getUserPosts(userId: number): Promise<ApiResponse<Post[]>> {
    return this.request<Post[]>(`/posts?userId=${userId}`);
  }

  // 댓글 관련 API
  async getComments(postId: number): Promise<ApiResponse<Comment[]>> {
    return this.request<Comment[]>(`/posts/${postId}/comments`);
  }

  // 할 일 관련 API
  async getTodos(): Promise<ApiResponse<Todo[]>> {
    return this.request<Todo[]>('/todos');
  }

  async getUserTodos(userId: number): Promise<ApiResponse<Todo[]>> {
    return this.request<Todo[]>(`/todos?userId=${userId}`);
  }
}

// Axios 기반 API 서비스
export class AxiosApiService {
  private client: AxiosInstance;

  constructor(client: AxiosInstance = apiClient) {
    this.client = client;
  }

  // 사용자 관련 API
  async getUsers(): Promise<User[]> {
    const response = await this.client.get<User[]>('/users');
    return response.data;
  }

  async getUser(id: number): Promise<User> {
    const response = await this.client.get<User>(`/users/${id}`);
    return response.data;
  }

  // 게시글 관련 API
  async getPosts(): Promise<Post[]> {
    const response = await this.client.get<Post[]>('/posts');
    return response.data;
  }

  async getPost(id: number): Promise<Post> {
    const response = await this.client.get<Post>(`/posts/${id}`);
    return response.data;
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    const response = await this.client.get<Post[]>(`/posts?userId=${userId}`);
    return response.data;
  }

  // 댓글 관련 API
  async getComments(postId: number): Promise<Comment[]> {
    const response = await this.client.get<Comment[]>(
      `/posts/${postId}/comments`
    );
    return response.data;
  }

  // 할 일 관련 API
  async getTodos(): Promise<Todo[]> {
    const response = await this.client.get<Todo[]>('/todos');
    return response.data;
  }

  async getUserTodos(userId: number): Promise<Todo[]> {
    const response = await this.client.get<Todo[]>(`/todos?userId=${userId}`);
    return response.data;
  }

  // POST 요청 예제
  async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    const response = await this.client.post<Post>('/posts', post);
    return response.data;
  }

  // PUT 요청 예제
  async updatePost(id: number, post: Partial<Post>): Promise<Post> {
    const response = await this.client.put<Post>(`/posts/${id}`, post);
    return response.data;
  }

  // DELETE 요청 예제
  async deletePost(id: number): Promise<void> {
    await this.client.delete(`/posts/${id}`);
  }
}

// 서비스 인스턴스 생성
export const fetchApiService = new FetchApiService();
export const axiosApiService = new AxiosApiService();
