const Hapi = require('@hapi/hapi');
const createServer = require('../../../../app/server');

const mockRegisterSpy = jest.fn();
const mockedInfo = {
  created: 1666795964619,
  host: "mock-host",
  id: "mock-host:18:id",
  port: 3600,
  protocol: "http",
  started: 0,
  uri: "http://localhost:3600",
};

jest.mock('@hapi/hapi', () => {
  const HapiOriginal = jest.requireActual('@hapi/hapi')
  return {
    ...HapiOriginal,
    server: () => {
      return {
        register: mockRegisterSpy,
        start: () => { },
        stop: () => { },
        route: () => { },
        views: () => { },
        info: mockedInfo,
      }
    }
  }
});

describe('Server test', () => {
  test('When authConfig disabled - createServer returns server with registered plugins', async () => {
    const server = await createServer();
    expect(server).toBeDefined();
    expect(server.info).toEqual(mockedInfo);
    expect(mockRegisterSpy.mock.calls[0][0].plugin.pkg._id).toContain("@hapi/inert");
    expect(mockRegisterSpy.mock.calls[1][0].plugin.pkg._id).toContain("@hapi/vision");
    expect(mockRegisterSpy.mock.calls[2][0].plugin.name).toBe("cookies");
    expect(mockRegisterSpy.mock.calls[3][0].plugin.name).toBe("error-pages");
    expect(mockRegisterSpy.mock.calls[4][0].plugin.plugin.name).toBe("header");
    expect(mockRegisterSpy.mock.calls[5][0].plugin.plugin.name).toBe("Gapi");
    expect(mockRegisterSpy.mock.calls[6][0][0].plugin.plugin.pkg._id).toContain("@hapi/yar");
    expect(mockRegisterSpy.mock.calls[6][0][1].plugin.plugin.pkg._id).toContain("@hapi/crumb");
  })
})
