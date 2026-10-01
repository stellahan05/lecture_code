import { expect } from "chai";
import * as desk from "../src/desk";

describe("printStatus", () => {
    it("reports an unknown offering", () => {
        desk.printStatus("FAKE OFFERING")
    })
});

describe("messageFor", () => {
    it("reports an unknown offering", () => {
        const result = desk.messageFor("FAKE OFFERING", new Date());
        expect(result).to.equal("no offering 'FAKE OFFERING'");
    })
});
