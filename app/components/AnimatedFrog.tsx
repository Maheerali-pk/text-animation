"use client";
import { FunctionComponent } from "react";
import { ILine } from "../types/animation";
import AnimatedText from "./AnimatedText";

const asciiLines: ILine[] = [
  {
    lineItems: [
      { text: "                                       .Mks", color: "#000000" },
    ],
  },
  {
    lineItems: [
      {
        text: "                                      CCkwFRCQ.",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                    .CR  . .:JCi",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                   wCVjsZ8:.. .h",
        color: "#000000",
      },

      {
        text: "CRQtZJj:.",
        color: "#D81AB6",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                   CR8jiI68:......vvMMYFFRFCQREeeN32s",
        color: "#D81AB6",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                   hCj:ws:s8s:::::sjs:s:s:..8ks8s8I8LRCRceeCCwjjj.",
        color: "#D81AB6",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                   LC:.:s::ssjs8ss3QEFRUjj: ..::s.. .:ssswv3QENCRRFCQFQ.",
        color: "#D81AB6",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                  sCKjZZTkQ:s3JTiTtY3w3Q  8: ::..:.:::",
        color: "#D81AB6",
      },
      {
        text: "...s.. ..:::sj:QRCNRw8",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                 FCr8Kwt2JTk:8tJJ8vCRRCCCCCRCV..8s::. ..:.::s:s:..:sj:s..:sMJRC8s",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                CC:tiw8ssstKss8tJJvsCkkCRkKMMj8:..3QtJt:. .....:ZL8sksss.......sVCRdC8",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                C8 sZQ38:js8ss88wJ8vL8:8:8s.:s::ssjRL8Lss   .sLrZ3.s8L...:..",
        color: "#000000",
      },

      {
        text: " .::sChhRF",
        color: "#E5E5E5",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                :C.  :tJYM8ss8s8tM8RCQRFYYk36Z8:  ...hCRFi8:    .R3::.LRi8s::ss.:::.. .CC8",
        color: "#E5E5E5",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                 sRC.  .sviRjZ8ss::88twvK8vMMM8.   :..UJMFhRhj.  sCvKsKJtJ8:::..:s.::.  sCCw8",
        color: "#E5E5E5",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                   sCQj    :s3LL3ss:...",
        color: "#E5E5E5",
      },

      {
        text: ":.s8w8s8s.s::..MfeFhRE8k. ss8M:ss.8:.:.ss.... ... svRC",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                     shEECs   .s8t36K8s:: ..s8s8s::ss.:.:..RhMCCRKM3.s.s::88s.s8:.s:.:s:... NCj",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                         .CCs     .s8tJwwv:  ..:s:s:..::RY:sis3hhQ3MM8...s. :s ..   .:...:::::.sC8.",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                           .tC.       .:s8ss:....s...s  EN:.. .:s8h:CR88Z8Z. .s. .8..:.....s::::.sC8",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                            wCs . ... ....ss8s:.Vr.s   v3:8s:.srsRs",
        color: "#000000",
      },

      {
        text: "88s88sse8ssTT:.sts:.. :.:...::..cCT",
        color: "#5CAC3A",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                           CQ. s.....::::..:.:s8:s:ss:s:8K8:s.sZJwQ.s8Q3ssUUEs8sssse.  ..s  :s.::. :sJC",
        color: "#5CAC3A",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                          CC:  ss.....::..:ss::.:.::srFhsZ8tK33LNH3UsNZZMZZJ3J8:::.ss..v..s:s8.:s.sKsC       :wi8s",
        color: "#5CAC3A",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                        .CR::s.8:::ss::s.::sssjs:s:srZ888sssss:sRFRrNJ3sstRFRM33LLrsrs33s::.s..:...:ss:C.    .CR3MMFRC",
        color: "#5CAC3A",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                       hC3sss ....8sss88s88888sLJEN8ttSFM3JtKsrZZhFEZsSJJSJfJsL33J3sss.sssJMKs..  ::ssC    .C3  ....XC.",
        color: "#5CAC3A",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                      KCsssss8: . .:ssrZzKss8ss8ssZss3NFwQ38s8sS8Q3f8EQsS38ZZrZsNssRFRRFEFfii:ssiTFs:sss:ssi.sCC..: CFhK",
        color: "#5CAC3A",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                     CCw8sZJZFRMCs  .ss:s:ss:s:s8ss:s:sSssKss8MFzjhr8dZQQzHZQZRsL.sJ33K3Zsss38s:8ZsfKrsssss8.R8s..sss:.sC",
        color: "#5CAC3A",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                    CCsZJwsMRFMRhhs  .::s:sssfMMs88s::sRssZhZ3Ls:8s8s8CRFRZR3Z3ZRr8L8sss8ssR:s8ssMsRZs8ss8ss:.:sMEssRs:sC.",
        color: "#5CAC3A",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                   PCssQFRJMMRZMMRMEj:....:sss8QssRh8h8N::",
        color: "#5CAC3A",
      },
      {
        text: "s3s8ZMRsss888RCQFR3s33hsRhRr8Ls8s:sssJssR3s8ssss::s3s8s:sss8:.sC.",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                  sCs8sFRZRfRFRRCRRRRRC8..::s:s:::sss8R8ssR8sRssZw33sss 8QR3JhMJsJhJZsZs8sZZ:.Ns:ssMFFZs8Zsss.ssJQss s:.Q8",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                  CR83RMQZJRMRMR3CC   sCCJ.::s.::s:sZhJZtRssSFEssQFs8S8s..rCQJ3hJwJsJKsJs88sK8ss8ZJFFZRRQZt88s.ss3r.:s8:.RC",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                 CQ8RfZJwJRMJw3CC      sCRs::s:::s88s8RZsJQJsRFMRFJwss8Js..wQZRRQQJR8ZsR8ssQ8ssQfZMMZRZR3RZs88:.8:s8:. CC",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                .QsR3J3JQFFRJRCR          CQZss8sss8ss8ZQsRkRMFQRMs8JRs8Rs. sRFFMMRMRsZ8sZs8s88ss8ZMRF3RMR3RMZsss:s8s8ss.sC",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                CM8RMRMFQMRQRCC          ",
        color: "#000000",
      },

      {
        text: "ERMRMRZsss8sssRM8RQFZ3QR8sQhZsZ8ss8:ssMFMRsRMQJ8sZs8sssRMRRRFQMRMRMRss:...s8Z8sC:",
        color: "#47A7E7",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                C8J3RFhRFRMRCC.          .CCs.CRRR3s8sss8ss8sMFMRRFRQssQJ8sssssQs8RRQssQZs8RssRMQRRCRRMRRFRRFss8s:  .:ZsC3",
        color: "#47A7E7",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                               CQRhRMRMRRRCC                 C3MRRR8ss8R8s:ssss8ZM",
        color: "#47A7E7",
      },
      {
        text: "RRMRQRs8Ms8Z8.sRMQRsRR8sZssRs8RMQRMRMR8s88s:s:s3s. sR::C",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                               QsRFRRFRMRR8sCQRR             jCRCRCRCRCRR3J8s8ss8JQRR8sRM8sRMZss8JMR3s8RMRs8JsZMRFRRMRRMRsss8sssRMv. 33s: C",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                               C8RFRMRMRR3JMRCCFNNJVss88s  CRCFFCCCRCCCR8w3Zs8ss8ZMFMRFRsZMsR3s8s88Z8RM8s8RFRRMRRMRRMR8w3sss:s8s8s..RCJ8s C",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                             sCRRMFRFZQRZ:JRRs8CsCRRCQQRC  .          CRCRRRFRR3RMRMRRFsZ8s8R3ss8s3ZMRRFsC3RMCRCCCRCRRR3RMRMRRRJsC8s8sC:.sC",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                           8CCR3J3MRRRQJRRJRMR3QFRRs8s8C.            8R8.   CR8Z3R3R3R3R3s8Rs8RMRMRRFCCCRCC.           sCQQMRFZRR8s8RsJJRJ sC",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                      sVSRRFCFF3R88sS3RFZFMQ3ZZF3MRZ8.ssCC                 :C8Z3J8M3sZ8R8RJsJZ3sZ3RRCRCCCRCC            sCQFFZRRRR3s8sJ8R8s C",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                    XCChsCRCQQCC8sCRCQQCCCCCCCCCCCCCCCRRC                 CCFt3RMR3s3J3J3MsRMsR8RCCCCCCCCCC.           .CRQRRFZRF3sRsR:s.. RC",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                   sCRCCCCs:  sC:sCRCs... ..:ssv33s                    CCsRRF3R3J3RJsRFR8s8ssCC:                    sCRRMRFF3RMZs8sZ8:.sC",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                    sJJj       CsTCC                                   :CCsJ3RMJ3RJs3MJ8s8s::RC                    RCRRMs8s::sJs8:...:RZs CC",
        color: "#621A80",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                               CCRC8                                  :CRsRMRJ3JJs3RJsRs::CR:                   sCRRJs8:.:::ssss.....:sCJ.:C",
        color: "#621A80",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                :::                                  sCFRRF3RR3J3RJ8Rss:CRR                    CCRsss:..:. .....:sssss:  Q.",
        color: "#621A80",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                                                    sCRsFQRMRR3RMRJ8ssCRC.                   .CCs88F3ss:...s88s:88ss88s  C:",
        color: "#621A80",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                                           sCRRRR3JMRs3RMRRRR3RMR8s8CCR                    sCRRs8ss:..:s3QRRCCCCCCCCC8s8C",
        color: "#621A80",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                                          sCu3QRRRRR8s3RRR3R3R3RR3JCRs                      .CC8s  sRCCCCs:.:::::. sCRCC",
        color: "#621A80",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                                          sCCsssss8RJsR3RMRR3RRCRs.                        CQs.sCRRCs.              ::.",
        color: "#621A80",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                                ..:88VZRRRs8ssR8s8J8ss8C3sR3s8C8                          CRRRCRL.",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                            .CRRRF33JJs88s8s3RZ8sR8ss8CRCQCCs                             sNNM",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                            RCRRCRRRCCCCCCCRs:..s3CRCCCCC8s",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                             ssss:.... .  NC. sCRCs.",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                                          CE:RC:",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                                          CCCC",
        color: "#000000",
      },
    ],
  },
  {
    lineItems: [
      {
        text: "                                                           ..",
        color: "#000000",
      },
    ],
  },
];

interface AnimatedFrogProps {}

const AnimatedFrog: FunctionComponent<AnimatedFrogProps> = () => {
  return <AnimatedText text={asciiLines} scrambleDuration={750} />;
};

export default AnimatedFrog;
