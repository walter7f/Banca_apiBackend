import {describe, test, expect, afterAll, jest} from "@jest/globals";
import request from "supertest";
import app from "../api/api.js"
import db from "../db/index.js";
import Product from "../models/Product.js";

describe("Product Controller", ()=>{
    const baseUrl="/api/pollos-hermanos/product";
    const testProduct = {name : "Test Product"}
     
    // cierra la conexion ala base de datos teminado el test
    afterAll(()=>{
        db.get().close();
    });

    test("POST - Product Creation", async () => {
        //mocked
        jest
        .spyOn(Product, "build")
        .mockImplementation(()=>({save:async()=> testProduct}));

        const response = await request(app).post(baseUrl).send(testProduct);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(testProduct.name);    
    
    });

    test("POST - Product Creation Fail", async () => {
        //mocked
        jest.spyOn(Product, "build").mockImplementation(()=>({
            save:async()=> {
                throw new Error("Test Error");
            } }));

        const response = await request(app).post(baseUrl).send(testProduct);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe(
            "There war an error while creating a new product: "
            );   
            
        expect(response.body.error).toBeDefined();
    
    });
});