package com.eb.esop.service.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.eb.esop.common.entity.SysEnumData;

public interface SysEnumDataRepository extends JpaRepository<SysEnumData, Long>, JpaSpecificationExecutor<SysEnumData>{


}
