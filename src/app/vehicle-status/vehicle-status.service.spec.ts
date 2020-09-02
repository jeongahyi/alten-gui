import { VehicleInfo } from '../models/vehicle-info';
import { TestBed } from '@angular/core/testing';
import { VehicleStatusService } from './vehicle-status.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('VehicleStatusService', () => {
  let service: VehicleStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    }).compileComponents();
    service = TestBed.inject(VehicleStatusService);
  });

  it('setStatus: should return Offline when status is one of null, undefined, "", offline', () => {
    // --- Arrange
    const inputs = [null, undefined, '', 'offline', 'Offline', 'on'];
    // --- Act & Assert
    expect(service.setStatus(inputs[0])).toEqual('Offline');
    expect(service.setStatus(inputs[1])).toEqual('Offline');
    expect(service.setStatus(inputs[2])).toEqual('Offline');
    expect(service.setStatus(inputs[3])).toEqual('Offline');
    expect(service.setStatus(inputs[4])).toEqual('Offline');
    expect(service.setStatus(inputs[5])).toEqual('Offline');
  });

  it('setStatus: should return Online when status is online', () => {
    // --- Arrange
    const inputs = ['online', 'ONLINE', 'Online'];
    // --- Act & Assert
    expect(service.setStatus(inputs[0])).toEqual('Online');
    expect(service.setStatus(inputs[1])).toEqual('Online');
    expect(service.setStatus(inputs[2])).toEqual('Online');
  });

  it('setValue: should return "-" when status is null, undefined, ""', () => {
    // --- Arrange
    const inputs = [null, undefined, ''];
    // --- Act & Assert
    expect(service.setValue(inputs[0])).toEqual('-');
    expect(service.setValue(inputs[1])).toEqual('-');
    expect(service.setValue(inputs[2])).toEqual('-');
  });

  it('setStates: should return normal list', () => {
    // --- Arrange
    const input: VehicleInfo[] = [
      {
        status: 'Online',
        owner_address: 'Cementvägen 8, 111 11 Södertälje',
        owner_name: 'Kalles Grustransporter AB',
        id: 'v1',
        registration_number: 'ABC123',
        vehicle_id: 'YS2R4X20005399401'
      },
      {
        status: 'Online',
        owner_address: 'Cementvägen 8, 111 11 Södertälje',
        owner_name: 'Kalles Grustransporter AB',
        id: 'v2',
        registration_number: 'DEF456',
        vehicle_id: 'VLUR4X20009093588'
      },
      {
        status: 'Online',
        owner_address: 'Cementvägen 8, 111 11 Södertälje',
        owner_name: 'Kalles Grustransporter AB',
        id: 'v3',
        registration_number: 'GHI789',
        vehicle_id: 'VLUR4X20009048066'
      },
      {
        status: 'Online',
        owner_address: 'Balkvägen 12, 222 22 Stockholm',
        owner_name: 'Johans Bulk AB',
        id: 'v4',
        registration_number: 'JKL012',
        vehicle_id: 'YS2R4X20005388011'
      },
      {
        status: 'Online',
        owner_address: 'Balkvägen 12, 222 22 Stockholm',
        owner_name: 'Johans Bulk AB',
        id: 'v5',
        registration_number: 'MNO345',
        vehicle_id: 'YS2R4X20005387949'
      },
      {
        status: 'Offline',
        owner_address: 'Budgetvägen 1, 333 33 Uppsala',
        owner_name: 'Haralds Värdetransporter AB',
        id: 'v6',
        registration_number: 'PQR678',
        vehicle_id: 'VLUR4X20009048066'
      },
      {
        status: 'Offline',
        owner_address: 'Budgetvägen 1, 333 33 Uppsala',
        owner_name: 'Haralds Värdetransporter AB',
        id: 'v7',
        registration_number: 'STU901',
        vehicle_id: 'YS2R4X20005387055'
      }
    ];
    // --- Act & Assert
    expect(service.setStates(input)).toEqual(input);
  });

  it('setStates: should return abnormal list', () => {
    // --- Arrange
    const input: VehicleInfo[] = [
      {
        status: null,
        owner_address: null,
        owner_name: null,
        id: null,
        registration_number: null,
        vehicle_id: null
      },
      {
        status: undefined,
        owner_address: undefined,
        owner_name: undefined,
        id: undefined,
        registration_number: undefined,
        vehicle_id: undefined
      },
      {
        status: '',
        owner_address: '',
        owner_name: '',
        id: '',
        registration_number: '',
        vehicle_id: ''
      },
      {
        status: 'Online',
        owner_address: 'Balkvägen 12, 222 22 Stockholm',
        owner_name: 'Johans Bulk AB',
        id: 'v4',
        registration_number: 'JKL012',
        vehicle_id: 'YS2R4X20005388011'
      }
    ];
    const result: VehicleInfo[] = [
      {
        status: 'Offline',
        owner_address: '-',
        owner_name: '-',
        id: '-',
        registration_number: '-',
        vehicle_id: '-'
      },
      {
        status: 'Offline',
        owner_address: '-',
        owner_name: '-',
        id: '-',
        registration_number: '-',
        vehicle_id: '-'
      },
      {
        status: 'Offline',
        owner_address: '-',
        owner_name: '-',
        id: '-',
        registration_number: '-',
        vehicle_id: '-'
      },
      {
        status: 'Online',
        owner_address: 'Balkvägen 12, 222 22 Stockholm',
        owner_name: 'Johans Bulk AB',
        id: 'v4',
        registration_number: 'JKL012',
        vehicle_id: 'YS2R4X20005388011'
      }
    ];
    // --- Act & Assert
    expect(service.setStates(input)).toEqual(result);
  });

});
