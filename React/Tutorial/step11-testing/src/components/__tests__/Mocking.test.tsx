import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// 모킹 예제 컴포넌트
const ApiService = {
  fetchUser: jest.fn(),
  saveUser: jest.fn(),
  deleteUser: jest.fn(),
};

const UserProfile: React.FC<{ userId: number }> = ({ userId }) => {
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const loadUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = await ApiService.fetchUser(userId);
      setUser(userData);
    } catch (err) {
      setError('사용자를 불러올 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  const saveUser = async (userData: any) => {
    setLoading(true);
    try {
      await ApiService.saveUser(userData);
      setUser(userData);
    } catch (err) {
      setError('사용자 저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    setLoading(true);
    try {
      await ApiService.deleteUser(userId);
      setUser(null);
    } catch (err) {
      setError('사용자 삭제에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadUser();
  }, [userId]);

  if (loading) return <div data-testid="loading">로딩 중...</div>;
  if (error) return <div data-testid="error">{error}</div>;
  if (!user) return <div data-testid="no-user">사용자가 없습니다.</div>;

  return (
    <div data-testid="user-profile">
      <h2>{user.name}</h2>
      <p>이메일: {user.email}</p>
      <button onClick={() => saveUser({ ...user, name: 'Updated Name' })}>
        업데이트
      </button>
      <button onClick={deleteUser}>삭제</button>
    </div>
  );
};

describe('Mocking Tests', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    // 각 테스트 전에 모든 모킹을 초기화
    jest.clearAllMocks();
  });

  describe('API Service Mocking', () => {
    it('successfully loads user data', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      ApiService.fetchUser.mockResolvedValue(mockUser);

      render(<UserProfile userId={1} />);

      expect(screen.getByTestId('loading')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByTestId('user-profile')).toBeInTheDocument();
      });

      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('이메일: john@example.com')).toBeInTheDocument();
      expect(ApiService.fetchUser).toHaveBeenCalledWith(1);
    });

    it('handles API fetch error', async () => {
      ApiService.fetchUser.mockRejectedValue(new Error('API Error'));

      render(<UserProfile userId={1} />);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toBeInTheDocument();
      });

      expect(
        screen.getByText('사용자를 불러올 수 없습니다.')
      ).toBeInTheDocument();
    });

    it('successfully updates user data', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      ApiService.fetchUser.mockResolvedValue(mockUser);
      ApiService.saveUser.mockResolvedValue({});

      render(<UserProfile userId={1} />);

      await waitFor(() => {
        expect(screen.getByTestId('user-profile')).toBeInTheDocument();
      });

      const updateButton = screen.getByText('업데이트');
      await user.click(updateButton);

      await waitFor(() => {
        expect(screen.getByText('Updated Name')).toBeInTheDocument();
      });

      expect(ApiService.saveUser).toHaveBeenCalledWith({
        id: 1,
        name: 'Updated Name',
        email: 'john@example.com',
      });
    });

    it('handles save error', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      ApiService.fetchUser.mockResolvedValue(mockUser);
      ApiService.saveUser.mockRejectedValue(new Error('Save Error'));

      render(<UserProfile userId={1} />);

      await waitFor(() => {
        expect(screen.getByTestId('user-profile')).toBeInTheDocument();
      });

      const updateButton = screen.getByText('업데이트');
      await user.click(updateButton);

      await waitFor(() => {
        expect(screen.getByTestId('error')).toBeInTheDocument();
      });

      expect(
        screen.getByText('사용자 저장에 실패했습니다.')
      ).toBeInTheDocument();
    });

    it('successfully deletes user', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      ApiService.fetchUser.mockResolvedValue(mockUser);
      ApiService.deleteUser.mockResolvedValue({});

      render(<UserProfile userId={1} />);

      await waitFor(() => {
        expect(screen.getByTestId('user-profile')).toBeInTheDocument();
      });

      const deleteButton = screen.getByText('삭제');
      await user.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByTestId('no-user')).toBeInTheDocument();
      });

      expect(ApiService.deleteUser).toHaveBeenCalledWith(1);
    });
  });

  describe('Timer Mocking', () => {
    it('handles debounced input', async () => {
      const DebouncedInput: React.FC = () => {
        const [value, setValue] = React.useState('');
        const [debouncedValue, setDebouncedValue] = React.useState('');

        React.useEffect(() => {
          const timer = setTimeout(() => {
            setDebouncedValue(value);
          }, 300);

          return () => clearTimeout(timer);
        }, [value]);

        return (
          <div>
            <input
              value={value}
              onChange={e => setValue(e.target.value)}
              data-testid="input"
            />
            <div data-testid="debounced-value">{debouncedValue}</div>
          </div>
        );
      };

      jest.useFakeTimers();
      render(<DebouncedInput />);

      const input = screen.getByTestId('input');
      const debouncedValue = screen.getByTestId('debounced-value');

      fireEvent.change(input, { target: { value: 'Hello' } });

      // 아직 debounced 값은 업데이트되지 않음
      expect(debouncedValue).toHaveTextContent('');

      // 300ms 후 debounced 값이 업데이트됨
      act(() => {
        jest.advanceTimersByTime(300);
      });

      expect(debouncedValue).toHaveTextContent('Hello');

      jest.useRealTimers();
    });
  });

  describe('Local Storage Mocking', () => {
    const mockLocalStorage = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };

    beforeEach(() => {
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true,
      });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('saves and loads data from localStorage', async () => {
      const LocalStorageComponent: React.FC = () => {
        const [data, setData] = React.useState('');
        const [savedData, setSavedData] = React.useState('');

        const saveData = () => {
          localStorage.setItem('testData', data);
        };

        const loadData = () => {
          const loaded = localStorage.getItem('testData');
          setSavedData(loaded || '');
        };

        return (
          <div>
            <input
              value={data}
              onChange={e => setData(e.target.value)}
              data-testid="data-input"
            />
            <button onClick={saveData} data-testid="save-button">
              저장
            </button>
            <button onClick={loadData} data-testid="load-button">
              로드
            </button>
            <div data-testid="saved-data">{savedData}</div>
          </div>
        );
      };

      render(<LocalStorageComponent />);

      const input = screen.getByTestId('data-input');
      const saveButton = screen.getByTestId('save-button');
      const loadButton = screen.getByTestId('load-button');
      const savedData = screen.getByTestId('saved-data');

      fireEvent.change(input, { target: { value: 'Test Data' } });
      fireEvent.click(saveButton);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'testData',
        'Test Data'
      );

      mockLocalStorage.getItem.mockReturnValue('Test Data');
      fireEvent.click(loadButton);

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('testData');
      expect(savedData).toHaveTextContent('Test Data');
    });
  });

  describe('Event Mocking', () => {
    it('handles custom events', () => {
      const EventComponent: React.FC = () => {
        const [message, setMessage] = React.useState('');

        React.useEffect(() => {
          const handleCustomEvent = (event: CustomEvent) => {
            setMessage(event.detail.message);
          };

          window.addEventListener(
            'customEvent',
            handleCustomEvent as EventListener
          );
          return () => {
            window.removeEventListener(
              'customEvent',
              handleCustomEvent as EventListener
            );
          };
        }, []);

        return <div data-testid="message">{message}</div>;
      };

      render(<EventComponent />);

      const messageDiv = screen.getByTestId('message');
      expect(messageDiv).toHaveTextContent('');

      // 커스텀 이벤트 발생
      act(() => {
        const customEvent = new CustomEvent('customEvent', {
          detail: { message: 'Hello from custom event!' },
        });
        window.dispatchEvent(customEvent);
      });

      expect(messageDiv).toHaveTextContent('Hello from custom event!');
    });
  });
});
