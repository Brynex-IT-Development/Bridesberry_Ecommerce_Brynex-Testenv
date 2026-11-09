"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductsQueryDto = exports.SortOption = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var SortOption;
(function (SortOption) {
    SortOption["FEATURED"] = "featured";
    SortOption["NEWEST"] = "newest";
    SortOption["PRICE_ASC"] = "price_asc";
    SortOption["PRICE_DESC"] = "price_desc";
    SortOption["RATING_DESC"] = "rating_desc";
})(SortOption || (exports.SortOption = SortOption = {}));
class GetProductsQueryDto {
    category;
    collection;
    minPrice;
    maxPrice;
    occasion;
    gender;
    inStock;
    search;
    sort;
    page;
    limit;
    newArrival;
    bestSeller;
    featured;
}
exports.GetProductsQueryDto = GetProductsQueryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetProductsQueryDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetProductsQueryDto.prototype, "collection", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetProductsQueryDto.prototype, "minPrice", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        const num = Number(value);
        return isNaN(num) ? undefined : num;
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetProductsQueryDto.prototype, "maxPrice", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetProductsQueryDto.prototype, "occasion", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetProductsQueryDto.prototype, "gender", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return undefined;
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], GetProductsQueryDto.prototype, "inStock", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetProductsQueryDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(SortOption, {
        message: 'Invalid sort option. Must be one of: featured, newest, price_asc, price_desc, rating_desc',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetProductsQueryDto.prototype, "sort", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        const num = parseInt(String(value), 10);
        return isNaN(num) ? 1 : num;
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetProductsQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        const num = parseInt(String(value), 10);
        return isNaN(num) ? 12 : num;
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetProductsQueryDto.prototype, "limit", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return undefined;
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], GetProductsQueryDto.prototype, "newArrival", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return undefined;
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], GetProductsQueryDto.prototype, "bestSeller", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === 'true')
            return true;
        if (value === 'false')
            return false;
        return undefined;
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], GetProductsQueryDto.prototype, "featured", void 0);
//# sourceMappingURL=get-products-query.dto.js.map