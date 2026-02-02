import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BlockChainState } from '../models/blockchain.model';
import { FileRecord } from '../models/file-record.model';
import {
  EnrollmentResult,
  HttpResponseWithStatus,
  RejectedResponse,
  VerificationResult,
} from '../models/http-response.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = '/api';
  private http = inject(HttpClient);

  private handleResponse<T>(response: HttpResponseWithStatus<T>): T {
    if (response.status === 'rejected') {
      throw new Error(response.message);
    }
    return response.data;
  }

  private handleError(error: HttpErrorResponse) {
    const body = error.error as RejectedResponse;
    const message = body?.message ?? 'HTTP Error';
    return throwError(() => new Error(message));
  }

  getBlockChain(): Observable<BlockChainState<FileRecord>> {
    return this.http
      .get<HttpResponseWithStatus<BlockChainState<FileRecord>>>(`${this.baseUrl}/blockchain`)
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  enrollFile(record: FileRecord): Observable<EnrollmentResult> {
    return this.http
      .post<HttpResponseWithStatus<EnrollmentResult>>(`${this.baseUrl}/enroll`, record)
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }

  verifyFile(record: FileRecord): Observable<VerificationResult> {
    return this.http
      .post<HttpResponseWithStatus<VerificationResult>>(`${this.baseUrl}/verify`, record)
      .pipe(map(this.handleResponse), catchError(this.handleError));
  }
}
