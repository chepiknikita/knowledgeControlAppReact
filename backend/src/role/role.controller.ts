import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.model';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth-decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  
  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 200, type: [Role] })
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'Get roles' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  getAll() {
    return this.roleService.getAll();
  }

  @ApiOperation({ summary: 'Get role by name' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get('/:name')
  getRoleByName(@Param('name') name: string) {
    return this.roleService.getRoleByName(name);
  }
}
