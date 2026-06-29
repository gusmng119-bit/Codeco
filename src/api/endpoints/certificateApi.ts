import { createApiClient, defineEndpoint } from "../core/apiClient";
import type { CertificateItem } from "../types/features";

export const certificateEndpoints = {
  getCertificates: defineEndpoint<void, CertificateItem[]>({
    url: "/certificates",
    method: "get",
  }),
  saveCertificate: defineEndpoint<Omit<CertificateItem, "id">, CertificateItem>({
    url: "/certificates",
    method: "post",
    requestStyle: "json",
  }),
};

export const certificateApi = createApiClient(certificateEndpoints);
