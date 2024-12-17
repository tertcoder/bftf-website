import React from "react";
import { CreditCard, Building2, Globe2, HelpCircle } from "lucide-react";
import paypal from "../assets/paypal.svg";
import NavBar from "./NavBar";

const DonationDetails = () => {
  const donationMethods = [
    {
      icon: <Building2 className="w-8 h-8 text-primary" />,
      title: "Bank Transfer",
      details: [
        {
          bankName: "Bank of Africa (BOA)",
          accountName: "Bloom for Tomorrow Foundation",
          accountNumber: "1234-5678-9012-3456",
          swiftCode: "BOAFBI01",
          branch: "Bujumbura Main Branch",
        },
        {
          bankName: "Ecobank Burundi",
          accountName: "BFTF International",
          accountNumber: "9876-5432-1098-7654",
          swiftCode: "ECOCBIBJ",
          branch: "Central Branch",
        },
      ],
    },
    {
      icon: <CreditCard className="w-8 h-8 text-secondary" />,
      title: "Mobile Money",
      details: [
        {
          provider: "Lumicash",
          number: "+1 (780) 910-1651",
          accountName: "BFTF Foundation",
        },
        {
          provider: "EcoCash",
          number: "+1 (780) 910-1651",
          accountName: "BFTF Foundation",
        },
      ],
    },
    {
      icon: <img src={paypal} className="w-8 h-8 text-blue-500" />,
      title: "PayPal",
      details: [
        {
          email: "contact@bloomfortomorrow.org",
          link: "paypal.me/bftfoundation",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-text mb-4">
              Donation Details
            </h2>
            <p className="text-lg text-text/80 max-w-2xl mx-auto">
              Choose your preferred method to support our mission. All donations
              are secure and will receive an official receipt.
            </p>
          </div>

          {/* Donation Methods */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {donationMethods.map((method, index) => (
              <div
                key={index}
                className="bg-background rounded-lg shadow-lg border-2 border-text/10 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4 border-b border-text/10 pb-4">
                    {method.icon}
                    <h3 className="text-xl font-bold text-text">
                      {method.title}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {method.details.map((detail, idx) => (
                      <div key={idx} className="mb-4 last:mb-0">
                        {detail.bankName && (
                          <>
                            <p className="font-semibold text-text">
                              {detail.bankName}
                            </p>
                            <p className="text-text/70">
                              Account Name: {detail.accountName}
                            </p>
                            <p className="text-text/70">
                              Account Number: {detail.accountNumber}
                            </p>
                            <p className="text-text/70">
                              SWIFT Code: {detail.swiftCode}
                            </p>
                            <p className="text-text/70">
                              Branch: {detail.branch}
                            </p>
                          </>
                        )}
                        {detail.provider && (
                          <>
                            <p className="font-semibold text-text">
                              {detail.provider}
                            </p>
                            <p className="text-text/70">
                              Number: {detail.number}
                            </p>
                            <p className="text-text/70">
                              Name: {detail.accountName}
                            </p>
                          </>
                        )}
                        {detail.email && (
                          <>
                            <p className="text-text/70">
                              Email: {detail.email}
                            </p>
                            <p className="text-text/70">
                              Direct Link: {detail.link}
                            </p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-primary/5 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-text">
                      Important Information
                    </h3>
                    <p className="text-text/70">
                      Please include your email address in the transfer
                      description for donation tracking and receipt purposes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe2 className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-text">
                      International Donations
                    </h3>
                    <p className="text-text/70">
                      For international wire transfers, please ensure all bank
                      charges are paid by the sender to ensure the full donation
                      amount is received.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="text-center mt-8">
              <p className="text-text/70 mb-2">
                Need assistance with your donation?
              </p>
              <p className="text-primary font-semibold">
                Contact our donation support team:
              </p>
              <p className="text-text">Email: contact@bloomfortomorrow.org</p>
              <p className="text-text">Phone: +1 (780) 910-1651</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
